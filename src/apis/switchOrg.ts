import { axiosInstance } from "@/utils/axios";

export async function switchOrg(orgId: string) {
  const response = await axiosInstance.post(`/auth/org/switch/${orgId}`);
  return response.data.data;
}
