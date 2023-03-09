import * as userApi from "../api/UserApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeDataAuth } from "../Types";
import { UserState } from "../Types";

const initialState: UserState = {
  token: "",
  error: undefined,
};

export const getUser = createAsyncThunk(
  "user/token",
  async (dataAuth: TypeDataAuth) => {
    const token = await userApi.requestAuth(dataAuth);
    return token;
  }
);

export const articlesSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        const tokenUser = action.payload;
        state.token = tokenUser.token;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
