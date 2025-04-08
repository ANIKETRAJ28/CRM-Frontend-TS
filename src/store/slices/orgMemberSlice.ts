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
    addOrgMember: (state, action) => {
      if (state) {
        state.push(action.payload);
      } else {
        state = [action.payload];
      }
      localStorage.setItem("orgMember", JSON.stringify(state));
      return state;
    },
    removeOrgMember: (state) => {
      state = null;
      localStorage.removeItem("orgMember");
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOrgMember.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.setItem("orgMember", JSON.stringify(action.payload));
      return state;
    });
  },
});

export const { addOrgMember, removeOrgMember } = orgMemberSlice.actions;
export const OrgMemberSlice = orgMemberSlice.reducer;
