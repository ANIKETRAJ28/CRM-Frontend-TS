import axios from "axios";
import { backendUrl } from "@/config/envConfig";

const defaultOptions = {
  baseURL: backendUrl,
  withCredentials: true,
};

export const axiosInstance = axios.create(defaultOptions);
