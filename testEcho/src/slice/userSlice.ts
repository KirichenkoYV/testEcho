import * as userApi from "../api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TypeDataAuth,
  TypeDataNewPassword,
  TypeNewUser,
  TypeUserPhone,
  UserState,
} from "../Types";

const initialState: UserState = {
  token: "",
  resetPass: { errors: undefined, message: undefined, success: undefined },
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
    return response;
  }
);

export const getUserPhone = createAsyncThunk(
  "user/resetPassword",
  async (userPhone: TypeUserPhone) => {
    const response = await userApi.requestPasswordReset(userPhone);
    return response;
  }
);

export const getUserNewPassword = createAsyncThunk(
  "user/resetPasswordCode",
  async (dataNewPassword: TypeDataNewPassword) => {
    const response = await userApi.requestPasswordCodeReset(dataNewPassword);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteToken(state) {
      state.token = "";
    },
  },
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
        const arrErrors = JSON.parse(
          action.error.message ? action.error.message : ""
        );
        state.errors = arrErrors;
      })
      .addCase(getUserPhone.fulfilled, (state, action) => {
        const resetStatus = action.payload;
        state.resetPass = resetStatus;
      })
      .addCase(getUserPhone.rejected, (state, action) => {
        const arrErrors = action.error.message;
        state.error = arrErrors;
      })
      .addCase(getUserNewPassword.fulfilled, (state, action) => {
        const tokenNewUser = action.payload;
        state.token = tokenNewUser.token;
      })
      .addCase(getUserNewPassword.rejected, (state, action) => {
        const arrErrors = JSON.parse(
          action.error.message ? action.error.message : ""
        );
        state.errors = arrErrors;
      });
  },
});

export const deleteToken = userSlice.actions.deleteToken;
export default userSlice.reducer;
