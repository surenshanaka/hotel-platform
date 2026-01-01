"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

export default function RoomsPage() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    apiFetch<{ effective_rate: number }>(
      "/rooms/1/rate?days_before_checkin=5"
    ).then((res) => setRate(res.effective_rate));
  }, []);

  return <div>Effective Rate: {rate}</div>;
}
