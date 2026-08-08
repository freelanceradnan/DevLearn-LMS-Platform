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
            url: "/updateAccesstoken",
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

const handleLogout = () => {
  if (
    !window.location.pathname.includes("/login") &&
    !window.location.pathname.includes("/register")
  ) {
    window.location.href = "/login";
  }
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
  }),
});
export const { useRegisterUserMutation } = ApiSlice;
