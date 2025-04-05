import { ITicketAdmin, ITicketAssignee, ITicketReporter } from "./ticket";

export interface IAssignedTicket {
  type: "assigned";
  ticket: ITicketAssignee;
}

export interface IAdminTicket {
  type: "admin";
  ticket: ITicketAdmin;
}

export interface IReporterTicket {
  type: "reported";
  ticket: ITicketReporter;
}
