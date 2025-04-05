import { getAssigneeTicket } from "@/apis/getTicket";
import { updateTicket } from "@/apis/ticket";
import { ITicketAssignee, ITicketStatus } from "@/interfaces/ticket";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ITicketAssignee[] | null = localStorage.getItem(
  "assignedTicket"
)
  ? JSON.parse(localStorage.getItem("assignedTicket") as string)
  : null;

export const setAssignedTicket = createAsyncThunk(
  "/ticket/setAssignedTicket",
  async () => {
    const response = await getAssigneeTicket();
    return response.data;
  }
);

export const updateAssignedTicket = createAsyncThunk(
  "/ticket/updateAssignedTicket",
  async (data: { id: string; status: ITicketStatus }) => {
    const response = await updateTicket(data.id, data.status);
    return response.data;
  }
);

const assignedTicketSlice = createSlice({
  name: "AssignedTicket",
  initialState,
  reducers: {
    removeAssignedTicket: (state) => {
      state = null;
      localStorage.removeItem("assignedTicket");
    },
    addAssignedTicket: (state, action) => {
      if (state) {
        state = [...state, action.payload];
      } else {
        state = [action.payload];
      }
      localStorage.setItem("assignedTicket", JSON.stringify(state));
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAssignedTicket.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.setItem("assignedTicket", JSON.stringify(action.payload));
      return action.payload;
    });
    builder.addCase(
      updateAssignedTicket.fulfilled,
      (state, action: { payload: ITicketAssignee }) => {
        if (state !== null) {
          state = state.map((ticket) => {
            if (ticket.id === action.payload.id) {
              return action.payload;
            }
            return ticket;
          });
          localStorage.setItem("assignedTicket", JSON.stringify(state));
          return state;
        }
      }
    );
  },
});

export const { addAssignedTicket, removeAssignedTicket } =
  assignedTicketSlice.actions;
export const AssignedTicketSlice = assignedTicketSlice.reducer;
