import { axiosInstance } from "@/utils/axios";

export async function getUserInfo() {
  const response = await axiosInstance.get("/auth");
  return response.data;
}
