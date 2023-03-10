import * as userApi from "../api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeDataAuth, TypeNewUser, UserState } from "../Types";

const initialState: UserState = {
  token: "",
  error: undefined,
  errors: undefined,
};

export const getUser = createAsyncThunk(
  "user/token",
  async (dataAuth: TypeDataAuth) => {
    const token = await userApi.requestAuth(dataAuth);
    return token;
  }
);

export const getNewUser = createAsyncThunk(
  "user/newUser",
  async (dataNewUser: TypeNewUser) => {
    const response = await userApi.requestRegister(dataNewUser);
    console.log(response);
    return response;
  }
);

export const userSlice = createSlice({
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
      })
      .addCase(getNewUser.fulfilled, (state, action) => {
        const tokenNewUser = action.payload;
        state.token = tokenNewUser.token;
      })
      .addCase(getNewUser.rejected, (state, action) => {
        const arrErrors = JSON.parse(action.error.message);
        state.errors = arrErrors;
      });
  },
});

export default userSlice.reducer;
