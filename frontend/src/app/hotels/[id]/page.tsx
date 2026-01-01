"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";
import { useAuthGuard } from "@/lib/authGuard";

interface Room {
  id: number;
  price_per_night: number;
}

interface Hotel {
  id: number;
  name: string;
  rooms: Room[];
}

export default function HotelDetailsPage() {
  const isAllowed = useAuthGuard();
  const params = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    apiFetch<Hotel>(`/hotels/${params.id}`).then(setHotel);
  }, [params.id]);

  if (isAllowed === null || !hotel) return null;
  if (!isAllowed) return null;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <h2>Rooms</h2>
      <ul>
        {hotel.rooms.map((room) => (
          <li key={room.id}>
            Room #{room.id} – ${room.price_per_night}
          </li>
        ))}
      </ul>
    </div>
  );
}
