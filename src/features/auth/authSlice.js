import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      localStorage.removeItem("auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
