import { axiosInstance } from "@/utils/axios";

export async function getUserOrgs() {
  const response = await axiosInstance.get("/userOrg");
  return response.data.data;
}
