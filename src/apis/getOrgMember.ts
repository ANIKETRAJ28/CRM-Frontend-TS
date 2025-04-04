import { axiosInstance } from "@/utils/axios";

export async function getOrgsMembers() {
  const response = await axiosInstance.get("/userOrg/org/members");
  return response.data.data;
}
