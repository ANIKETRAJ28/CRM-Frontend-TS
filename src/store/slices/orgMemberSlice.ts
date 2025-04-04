import { getOrgsMembers } from "@/apis/getOrgMember";
import { IUserOrgMember } from "@/interfaces/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IUserOrgMember[] | null = localStorage.getItem("orgMember")
  ? JSON.parse(localStorage.getItem("orgMember") as string)
  : null;

export const setOrgMember = createAsyncThunk(
  "/orgMember/setOrgMember",
  async () => {
    const response = await getOrgsMembers();
    return response;
  }
);

const orgMemberSlice = createSlice({
  name: "OrgMember",
  initialState,
  reducers: {
    removeOrgMember: (state) => {
      state = null;
      localStorage.removeItem("orgMember");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOrgMember.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.setItem("orgMember", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export const { removeOrgMember } = orgMemberSlice.actions;
export const OrgMemberSlice = orgMemberSlice.reducer;
