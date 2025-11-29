"use server";

import { cookies } from "next/headers";
import { api } from "./client";
import type { DashboardData, ApiResponse, AuthResponse, IsSaved, FavoriteVerseResponse } from "./models";

export async function getDashboardData(): Promise<DashboardData> {
  const token = (await cookies()).get("token")?.value || "";

  const res: ApiResponse<DashboardData> = await api("/memoryverse/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}


export async function toggleFavVerse(verse_id: number): Promise<IsSaved> {
 const token = (await cookies()).get("token")?.value || "";

  const res: ApiResponse<IsSaved> = await api("/memoryverse/toggle-favourite-verse", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ verse_id }),
  });

  return res.data;
}

export async function saveNote(content: string, verse_reference: string): Promise<AuthResponse> {
 const token = (await cookies()).get("token")?.value || "";

  const res: ApiResponse<AuthResponse> = await api("/memoryverse/save-note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, verse_reference }),
  });

  return res.data;
}


export async function getFavouriteVerses(): Promise<FavoriteVerseResponse[]> {
  const token = (await cookies()).get("token")?.value || "";

  const res: ApiResponse<FavoriteVerseResponse[]> = await api("/memoryverse/get-favourite-verses", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Fetched favorite verses:", res.data);

  return res.data;
}





