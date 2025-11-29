
//  API response wrapper
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  status: number;
  success: boolean;
  message: string;
  data: any;
}

export interface Verse {
  id: number;
  reference: string;    
  verse: string;           
  translation: string;     
  created_at: string;      
  is_favourite: boolean;
}

export interface User {
  id: number;
  user_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  token: string;
  is_subscribed: boolean;
  is_profile_completed?: boolean;
  verse_pace: string; 
  inspiration: string[]; 
  bible_translation: string;
  enable_notifications: boolean;
  is_email_notifications: boolean;
  is_web_notifications: boolean;
  selected_time: string;
}

export interface DashboardData {
  notes: Note[];
  verse_history: VerseHistory[];
  user: User;
  verse: Verse;   
}

export interface VerseHistory {
  verse_id: number;
  verse: Verse;
  delivered_at: string;
};

export interface Note { 
  content: string; 
  created_at: string; 
  id: number; 
  updated_at: string; 
  verse_reference: string
}

export interface IsSaved {
  is_saved: boolean
}

export interface FavoriteVerseResponse {
  id: number;
  user_id: number;
  verse_id: number;
  verse: Verse;
  created_at: string;
}

