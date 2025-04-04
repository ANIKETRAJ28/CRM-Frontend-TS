import { switchOrg } from "@/apis/switchOrg";
import { IOrgRole } from "@/interfaces/userOrg";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IActiveOrgState {
  activeOrgId: string | null;
  activeOrgRole: IOrgRole | null;
}

const initialState: IActiveOrgState = {
  activeOrgId: localStorage.getItem("activeOrgId"),
  activeOrgRole: localStorage.getItem("activeOrgRole")
    ? (localStorage.getItem("activeOrgRole") as IOrgRole)
    : null,
};

export const setActiveOrg = createAsyncThunk(
  "/activeOrg/setActiveOrg",
  async ({ orgId, role }: { orgId: string; role: string }) => {
    await switchOrg(orgId);
    return { orgId: orgId, role: role };
  }
);

const activeOrgSlice = createSlice({
  name: "ActiveOrg",
  initialState,
  reducers: {
    removeActiveOrg: (state: IActiveOrgState) => {
      state.activeOrgId = null;
      state.activeOrgRole = null;
      localStorage.removeItem("activeOrgId");
      localStorage.removeItem("activeOrgRole");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setActiveOrg.fulfilled, (state, action) => {
      state.activeOrgId = action.payload.orgId;
      state.activeOrgRole = action.payload.role as IOrgRole;
      localStorage.setItem("activeOrgId", action.payload.orgId);
      localStorage.setItem("activeOrgRole", action.payload.role);
    });
  },
});

export const { removeActiveOrg } = activeOrgSlice.actions;
export const ActiveOrgSlice = activeOrgSlice.reducer;
