import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    ChangePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
