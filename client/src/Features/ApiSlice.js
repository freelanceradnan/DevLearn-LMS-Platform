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
  tagTypes: ["users", "course", "orders", "faq", "partner"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: "/activation",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    socialAuth: builder.mutation({
      query: ({ credential, githubDetails }) => ({
        url: "/social-auth",
        method: "POST",
        body: { credential, githubDetails },
      }),
    }),
    githubAuth: builder.mutation({
      query: (code) => ({
        url: "/github",
        method: "POST",
        body: { code },
      }),
    }),
    ImageUpload: builder.mutation({
      query: (formdata) => ({
        url: "/upload",
        method: "POST",
        body: formdata,
      }),
    }),
    CreateCourse: builder.mutation({
      query: (data) => ({
        url: "/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    AllCourses: builder.query({
      query: () => ({
        url: "/all-course",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["course"],
    }),
    GetAllUsers: builder.query({
      query: () => ({
        url: "/getAlluser",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["users"],
    }),
    DeleteUser: builder.mutation({
      query: (id) => ({
        url: `/DeleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    DeleteCourse: builder.mutation({
      query: (id) => ({
        url: `/DeleteCourse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
    ChangeRole: builder.mutation({
      query: ({ id, role }) => ({
        url: "/update-user",
        method: "PUT",
        body: { id, role },
      }),
      invalidatesTags: ["users"],
    }),

    updateCourse: builder.mutation({
      query: ({ editId, payload }) => ({
        url: `/update-course/${editId}`,
        method: "PUT",
        body: { data: payload },
      }),
      invalidatesTags: ["course"],
    }),
    updateHero: builder.mutation({
      query: ({ dataId, payload }) => ({
        url: `/update-hero/${dataId}`,
        method: "PUT",
        body: { data: payload },
      }),
    }),
    GetHeroInfo: builder.query({
      query: () => ({
        url: "/hero-info",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    UpdateFaq: builder.mutation({
      query: (payload) => ({
        url: "/update-faq",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["faq"],
    }),
    GetFaq: builder.query({
      query: () => ({
        url: "/get-faq",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["faq"],
    }),
    UpdateCategory: builder.mutation({
      query: (categories) => ({
        url: "/updateCategory",
        method: "PUT",
        body: { data: categories },
      }),
    }),
    GetAllCategory: builder.query({
      query: () => ({
        url: "/getAllCategory",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    CourseAnalytics: builder.query({
      query: () => ({
        url: "/courses-analytics",
        method: "GET",
      }),
      transformResponse:(response)=>response.courseInfo.last12Months

    }),
    UsersAnalytics:builder.query({
      query:()=>({
        url:'/users-analytics',
        method:'GET'
      }),
       transformResponse:(response)=>response.users.last12Months
    }),
    OrderAnalytics:builder.query({
    query:()=>({
    url:'/orders-analytics',
    method:'GET'
    }),
    transformResponse:(response)=>response.orders.last12Months
    })
    
  }),
});
export const {
  useRegisterUserMutation,
  useActivateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useSocialAuthMutation,
  useGithubAuthMutation,
  useImageUploadMutation,
  useCreateCourseMutation,
  useAllCoursesQuery,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useDeleteCourseMutation,
  useChangeRoleMutation,
  useUpdateCourseMutation,
  useUpdateHeroMutation,
  useGetHeroInfoQuery,
  useUpdateFaqMutation,
  useGetFaqQuery,
  useUpdateCategoryMutation,
  useGetAllCategoryQuery,
  useCourseAnalyticsQuery,
  useUsersAnalyticsQuery,
  useOrderAnalyticsQuery
} = ApiSlice;
