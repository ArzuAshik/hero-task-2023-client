import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/Api/apiSlice";
import authReducers from "../features/auth/authSlice";
import pageReducers from "../features/page/pageSlice";
import searchReducers from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducers,
    page: pageReducers,
    search: searchReducers,
  },
  middleware: (getDefultMiddlewares) =>
    getDefultMiddlewares().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
