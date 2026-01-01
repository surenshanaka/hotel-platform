"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    const fetchHotels = async () => {
      try {
        const data = await apiFetch<Hotel[]>("/hotels");
        setHotels(data);
      } catch (err) {
        console.error("Failed to fetch hotels:", err);
      }
    };

    fetchHotels();
  }, []);

  if (isAllowed === null) return <p>Loading...</p>;
  if (!isAllowed) return <p>Access denied</p>;

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
        </div>
      ))}
    </div>
  );
}
