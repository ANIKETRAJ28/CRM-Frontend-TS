import { axiosInstance } from "@/utils/axios";

export async function getAssigneeTicket() {
  const response = await axiosInstance.get("/ticket/assignee");
  return response.data;
}

export async function getReportedTicket() {
  const response = await axiosInstance.get("/ticket/reporter");
  return response.data;
}

export async function getAdminTicket() {
  const response = await axiosInstance.get("/ticket");
  return response.data;
}
