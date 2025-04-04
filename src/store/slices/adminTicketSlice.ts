import { getAdminTicket } from "@/apis/getTicket";
import { ITicketAdmin } from "@/interfaces/ticket";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ITicketAdmin[] | null = localStorage.getItem("adminTicket")
  ? JSON.parse(localStorage.getItem("adminTicket") as string)
  : null;

export const setAdminTicket = createAsyncThunk(
  "/ticket/setAdminTicket",
  async () => {
    const response = await getAdminTicket();
    return response.data;
  }
);

const adminTicketSlice = createSlice({
  name: "AdminTicket",
  initialState,
  reducers: {
    removeAdminTicket: (state) => {
      state = null;
      localStorage.removeItem("adminTicket");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAdminTicket.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.setItem("adminTicket", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export const { removeAdminTicket } = adminTicketSlice.actions;
export const AdminTicketSlice = adminTicketSlice.reducer;
