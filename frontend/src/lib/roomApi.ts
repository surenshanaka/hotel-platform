import { apiFetch } from "./apiClient";

export function getRooms() {
  return apiFetch<{ id: number; base_price: number }[]>(
    "/rooms"
  );
}

export function adjustRoomRate(
  roomId: number,
  newRate: number,
  reason: string
) {
  return apiFetch(`/rooms/${roomId}/adjust-rate`, {
    method: "POST",
    body: JSON.stringify({
      new_rate: newRate,
      reason,
    }),
  });
}

export function getRateHistory(roomId: number) {
  return apiFetch<
    {
      old_rate: number;
      new_rate: number;
      reason: string;
      created_at: string;
    }[]
  >(`/rooms/${roomId}/rate-history`);
}
