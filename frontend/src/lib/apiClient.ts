import { API_BASE_URL } from "./config";

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
