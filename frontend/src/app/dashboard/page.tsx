"use client";

import { useEffect, useState } from "react";
import { useAuthGuard } from "@/lib/authGuard";
import RoomCard from "@/components/RoomCard";
import AdjustRateModal from "@/components/AdjustRateModal";
import RateHistory from "@/components/RateHistory";
import { getRooms } from "@/lib/roomApi";

type Room = {
  id: number;
  base_price: number;
};

export default function DashboardPage() {
  const isAllowed = useAuthGuard();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
  const [selectedRoomForHistory, setSelectedRoomForHistory] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (isAllowed) {
      getRooms().then(setRooms);
    }
  }, [isAllowed]);

  if (isAllowed === null) return <div className="p-8">Loading...</div>;
  if (!isAllowed) return <div className="p-8">Access denied</div>;

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id}>
            <RoomCard room={room} onAdjust={() => setActiveRoomId(room.id)} />

            <button
              onClick={() => setSelectedRoomForHistory(room.id)}
              className="mt-2 text-sm text-blue-600 underline"
            >
              View Rate History
            </button>

            {selectedRoomForHistory === room.id && (
              <RateHistory roomId={room.id} />
            )}
          </div>
        ))}
      </div>

      {/* Adjust Rate Modal */}
      {activeRoomId && (
        <AdjustRateModal
          roomId={activeRoomId}
          onClose={() => {
            setActiveRoomId(null);
            getRooms().then(setRooms); // refresh prices
          }}
        />
      )}
    </div>
  );
}
