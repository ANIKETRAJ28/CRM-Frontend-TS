import { backendUrl } from "@/config/envConfig";

export function connectSocket(id: string) {
  const url = backendUrl.split("://")[0] === "http" ? "ws" : "wss";
  const socket = new WebSocket(`wss://${url}?userId=${id}`);
  return socket;
}
