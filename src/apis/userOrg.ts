import { axiosInstance } from "@/utils/axios";

export async function createOrg(orgName: string) {
  const response = await axiosInstance.post("/org", {
    orgName,
  });
  return response.data.data;
}

export async function inviteUser(email: string) {
  try {
    await axiosInstance.post("/orgInvite", {
      email,
    });
    return "Invited successfully";
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function joinAsEngineer(inviteCode: string) {
  try {
    const response = await axiosInstance.post(`/userOrg/${inviteCode}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function joinAsUser(orgName: string) {
  try {
    const response = await axiosInstance.post(`/userOrg/org/${orgName}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
