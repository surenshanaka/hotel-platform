"use client";

import { useAuthGuard } from "@/lib/authGuard";

export default function DashboardPage() {
  useAuthGuard();
  return <h1>Dashboard</h1>;
}
