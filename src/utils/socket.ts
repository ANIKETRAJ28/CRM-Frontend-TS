export function connectSocket(id: string) {
  const socket = new WebSocket(`ws://localhost:3000?userId=${id}`);
  return socket;
}
