"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useAuthGuard } from "@/lib/authGuard";

interface Hotel {
  id: number;
  name: string;
}

export default function HotelsPage() {
  const isAllowed = useAuthGuard();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    apiFetch<Hotel[]>("/hotels").then(setHotels);
  }, []);

  if (!isAllowed) return null;

  return (
    <div>
      <h1>Hotels</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>
    </div>
  );
}
