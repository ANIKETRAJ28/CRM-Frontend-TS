import { axiosInstance } from "@/utils/axios";

export async function logout() {
  await axiosInstance.get("/auth/logout");
}
