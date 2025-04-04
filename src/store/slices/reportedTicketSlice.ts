import { getReportedTicket } from "@/apis/getTicket";
import { createTicket } from "@/apis/ticket";
import {
  ITicketAdmin,
  ITicketPriority,
  ITicketReporter,
} from "@/interfaces/ticket";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: ITicketReporter[] | null = localStorage.getItem(
  "reportedTicket"
)
  ? JSON.parse(localStorage.getItem("reportedTicket") as string)
  : null;

export const setReportedTicket = createAsyncThunk(
  "/ticket/setReportedTicket",
  async () => {
    const response = await getReportedTicket();
    return response.data;
  }
);

export const createTicketForUsers = createAsyncThunk(
  "/ticket/createTicketForUsers",
  async (data: {
    title: string;
    description: string;
    priority: ITicketPriority;
  }) => {
    const response = await createTicket(
      data.title.trim(),
      data.description.trim(),
      data.priority
    );
    return response.data;
  }
);

export const createTicketForAdmin = createAsyncThunk(
  "/ticket/createTicketForAdmin",
  async (data: {
    title: string;
    description: string;
    priority: ITicketPriority;
  }) => {
    const response = await createTicket(
      data.title.trim(),
      data.description.trim(),
      data.priority
    );
    return response.data;
  }
);

const reportedTicketSlice = createSlice({
  name: "ReportedTicket",
  initialState,
  reducers: {
    setReportedTicketData(state, action) {
      if (state === null) {
        state = action.payload.data;
      }
    },
    removeReportedTicket: (state) => {
      state = null;
      localStorage.removeItem("reportedTicket");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setReportedTicket.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.setItem("reportedTicket", JSON.stringify(action.payload));
      return action.payload;
    });
    builder.addCase(
      createTicketForUsers.fulfilled,
      (state, action: { payload: ITicketReporter }) => {
        if (state !== null) {
          state = [
            ...state,
            {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              orgId: action.payload.orgId,
              assigneeId: action.payload.assigneeId,
              assigneeName: action.payload.assigneeName,
              priority: action.payload.priority,
              status: action.payload.status,
            },
          ];
          localStorage.setItem("reportedTicket", JSON.stringify(state));
        } else {
          state = [
            {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              orgId: action.payload.orgId,
              assigneeId: action.payload.assigneeId,
              assigneeName: action.payload.assigneeName,
              priority: action.payload.priority,
              status: action.payload.status,
            },
          ];
          localStorage.setItem("reportedTicket", JSON.stringify(state));
        }
        toast.success("Ticket created successfully");
        return state;
      }
    );
    builder.addCase(
      createTicketForAdmin.fulfilled,
      (state, action: { payload: ITicketAdmin }) => {
        if (state !== null) {
          state = [
            ...state,
            {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              orgId: action.payload.orgId,
              assigneeId: action.payload.assigneeId,
              assigneeName: action.payload.assigneeName,
              priority: action.payload.priority,
              status: action.payload.status,
            },
          ];
          localStorage.setItem("reportedTicket", JSON.stringify(state));
        } else {
          state = [
            {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              orgId: action.payload.orgId,
              assigneeId: action.payload.assigneeId,
              assigneeName: action.payload.assigneeName,
              priority: action.payload.priority,
              status: action.payload.status,
            },
          ];
          localStorage.setItem("reportedTicket", JSON.stringify(state));
        }
        toast.success("Ticket created successfully");
        return state;
      }
    );
  },
});

export const { setReportedTicketData, removeReportedTicket } =
  reportedTicketSlice.actions;
export const ReportedTicketSlice = reportedTicketSlice.reducer;
