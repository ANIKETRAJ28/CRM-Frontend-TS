import { backendUrl } from "@/config/envConfig";

export function connectSocket(id: string) {
  const socket = new WebSocket(`wss://${backendUrl}?userId=${id}`);
  return socket;
}
