import { ITicketPriority, ITicketStatus } from "@/interfaces/ticket";
import { axiosInstance } from "@/utils/axios";

export async function createTicket(
  title: string,
  description: string,
  priority: ITicketPriority
) {
  const response = await axiosInstance.post("/ticket", {
    title,
    description,
    priority,
  });
  return response.data;
}

export async function updateTicket(ticketId: string, status: ITicketStatus) {
  const response = await axiosInstance.put(`/ticket/${ticketId}`, {
    status,
  });
  return response.data;
}
