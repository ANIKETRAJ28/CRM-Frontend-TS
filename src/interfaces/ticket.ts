import { IOrgRole } from "./userOrg";

export interface ITicket {
  id: string;
  title: string;
  description: string;
  status: ITicketStatus;
  priority: ITicketPriority;
  orgId: string;
}

export interface ITicketReporter extends ITicket {
  assigneeId: string;
  assigneeName: string;
}

export interface ITicketAssignee extends ITicket {
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  reporterRole: IOrgRole;
}

export interface ITicketAdmin extends ITicket {
  assigneeId: string;
  assigneeName: string;
  assigneeEmail: string;
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  reporterRole: IOrgRole;
}

export type ITicketStatus =
  | "OPEN"
  | "CLOSED"
  | "PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "HOLD";

export type ITicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
