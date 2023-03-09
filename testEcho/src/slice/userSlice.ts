import * as userApi from "../api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "/api/articles",
  async (phone, password) => {
    const token = await userApi.requestAuth(phone, password);
    console.log(token);
    return token;
  }
);
