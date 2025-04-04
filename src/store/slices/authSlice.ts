import { getUserInfo } from "@/apis/userInfo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  id: string | null;
  name: string | null;
  email: string | null;
  iat: number | null;
  exp: number | null;
}

const initialState: IAuthState = {
  id: localStorage.getItem("id") || null,
  name: localStorage.getItem("name") || null,
  email: localStorage.getItem("email") || null,
  iat: Number(localStorage.getItem("iat")) || null,
  exp: Number(localStorage.getItem("exp")) || null,
};

export const setUser = createAsyncThunk("/auth/setUser", async () => {
  const response = await getUserInfo();
  return response.data;
});

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    removeUser: (state: IAuthState) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.iat = null;
      state.exp = null;
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("iat");
      localStorage.removeItem("exp");
      localStorage.removeItem("activeOrgId");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.iat = action.payload.iat;
      state.exp = action.payload.exp;
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("iat", action.payload.iat.toString());
      localStorage.setItem("exp", action.payload.exp.toString());
    });
  },
});

export const { removeUser } = authSlice.actions;
export const AuthSlice = authSlice.reducer;
