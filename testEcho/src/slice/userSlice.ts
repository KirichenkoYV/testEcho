import * as userApi from "../api/userApi";
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
    console.log(token);
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
        console.log(tokenUser);
        state.token = tokenUser.token;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        console.log(state.error);
      });
  },
});

export default articlesSlice.reducer;
