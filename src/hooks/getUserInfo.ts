import { getUserInfo } from "@/apis/userInfo";
import { IUser } from "@/interfaces/user";
import { toast } from "sonner";

export async function getUser(): Promise<IUser | null> {
  try {
    const response = await getUserInfo();
    toast.success("User data fetched successfully", {
      style: {
        background: "#4caf50",
        border: "1px solid #4caf50",
        color: "#fff",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
