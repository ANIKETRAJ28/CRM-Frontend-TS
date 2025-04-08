import { ITicketAdmin, ITicketAssignee, ITicketReporter } from "./ticket";
import { IUserOrgMember } from "./user";

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

export interface IMemberTicket {
  type: "member";
  ticket: IUserOrgMember;
}
