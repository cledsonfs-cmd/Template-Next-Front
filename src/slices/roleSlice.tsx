import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Role from "../model/Role";
import roleService from "../services/roleService";

const initialState = {
  roles: [],
  role: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

//Listar
export const listar = createAsyncThunk("role/listar", async (valor) => {
  const token = localStorage.getItem("token");

  const data = await roleService.listar(token);

  return data;
});

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(listar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.roles = action?.payload;
      });
  },
});

export const { reset } = roleSlice.actions;
export default roleSlice.reducer;
