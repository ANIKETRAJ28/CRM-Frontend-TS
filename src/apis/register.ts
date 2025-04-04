import { axiosInstance } from "@/utils/axios";

export async function registerEmail(email: string) {
  const response = await axiosInstance.post(`/register/email/${email}`);
  return {
    step: response.data.data.step,
    message: response.data.message,
  };
}

export async function verifyOtp(otp: string) {
  const response = await axiosInstance.post(`/register/otp/${otp}`);
  return {
    step: response.data.data.step,
    message: response.data.message,
  };
}

export async function completeProfile(name: string, password: string) {
  const response = await axiosInstance.post(`/auth/signup/`, {
    password,
    name,
  });
  return response.data.message;
}
