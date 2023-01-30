import { errorAlert, successAlert } from "../../utils";
import { apiSlice } from "../Api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.token,
            })
          );
          // STORE USER TO REDUX STORE
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.token,
            })
          );
        } catch (error) {
          if (error?.error?.data?.message) {
            errorAlert(error.error.data.message);
          } else {
            errorAlert("Something went wrong");
          }
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          result.data.data &&
            successAlert("User registered successfully, please login");
        } catch (error) {
          if (error?.error?.data?.message) {
            errorAlert(error.error.data.message);
          } else {
            errorAlert("something went wrong");
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
