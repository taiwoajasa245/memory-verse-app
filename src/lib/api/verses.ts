import { api } from "./client";
import type { Verse, ApiResponse } from "./models";



// GET Verse of the Day
export const getVerseOfTheDay = async (): Promise<Verse> => {
  const res: ApiResponse<Verse> = await api("/memoryverse/daily-verse");
  return res.data;
};
