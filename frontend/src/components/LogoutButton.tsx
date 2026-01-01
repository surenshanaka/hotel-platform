"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/lib/authGuard";

interface LogoutButtonProps {
  variant?: "header" | "default";
}

export default function LogoutButton({
  variant = "header",
}: LogoutButtonProps) {
  if (variant === "header") {
    return (
      <button
        onClick={logout}
        className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/40 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Logout"
      >
        <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        <span className="font-semibold">Logout</span>
      </button>
    );
  }

  return (
    <button
      onClick={logout}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      aria-label="Logout"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}
