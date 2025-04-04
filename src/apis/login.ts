import { ILogin } from "@/interfaces/auth";
import { axiosInstance } from "@/utils/axios";

export async function login(data: ILogin) {
  await axiosInstance.post("/auth/signin", data);
}
