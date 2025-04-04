import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { OrgSlice } from "./slices/orgSlice";
import { ActiveOrgSlice } from "./slices/activeOrgSlice";
import { AssignedTicketSlice } from "./slices/assignedTicketSlice";
import { ReportedTicketSlice } from "./slices/reportedTicketSlice";
import { ActiveToggleSlice } from "./slices/acticeToggleSlice";
import { AdminTicketSlice } from "./slices/adminTicketSlice";
import { OrgMemberSlice } from "./slices/orgMemberSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    org: OrgSlice,
    activeOrg: ActiveOrgSlice,
    assignedTicket: AssignedTicketSlice,
    reportedTicket: ReportedTicketSlice,
    adminTicket: AdminTicketSlice,
    activeToggleSlice: ActiveToggleSlice,
    orgMember: OrgMemberSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
