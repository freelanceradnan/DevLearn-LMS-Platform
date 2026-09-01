import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const BaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_SERVER,
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await BaseQuery(args, api, extraOptions);

  if (result?.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await BaseQuery(
          {
            url: "/refreshtoken",
            method: "GET",
          },
          api,
          extraOptions,
        );

        if (refreshResult?.data) {
          result = await BaseQuery(args, api, extraOptions);
        } else {
          handleLogout();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await BaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["users", "address", "orders", "products", "partner"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    activateUser:builder.mutation({
    query:(data)=>({
    url:"/activation",
    method:'POST',
    body:data
    })
    }),
    loginUser:builder.mutation({
    query:(data)=>({
    url:'/login',
    method:'POST',
    body:data
    })
    }),
    logoutUser:builder.mutation({
    query:()=>({
    url:'/logout',
    method:'POST'
    })
    }),
    socialAuth:builder.mutation({
    query:({credential,githubDetails})=>({
    url:'/social-auth',
    method:'POST',
    body:{credential,githubDetails}
    })
    }),
    githubAuth:builder.mutation({
     query:(code)=>({
     url:'/github',
     method:'POST',
     body:{code}
     })
    }),
    ImageUpload:builder.mutation({
      query:(formdata)=>({
      url:'/upload',
      method:'POST',
      body:formdata
      })
    }),
    CreateCourse:builder.mutation({
      query:(data)=>({
       url:'/create-course',
       method:'POST',
       body:data
      })
    })
  }),
});
export const { useRegisterUserMutation,useActivateUserMutation,useLoginUserMutation,useLogoutUserMutation,useSocialAuthMutation,useGithubAuthMutation,useImageUploadMutation,useCreateCourseMutation} = ApiSlice;
