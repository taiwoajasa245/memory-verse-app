"use server";

import { cookies } from "next/headers";
import { api } from "./client";
import type { User, ApiResponse, AuthResponse } from "./models";


// Sign Up User
export const registerWithEmail = async (
  email: string,
    password: string
): Promise<{token: string; user: User; message: string}> => {
  const res: ApiResponse<User> = await api("/auth/register-with-email", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return { token: res.data.token, user: res.data, message: res.message };
};


// Login User
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<{ token: string; user: User; message: string }> => {

  console.log("Logging in with email:", email);

  const res: ApiResponse<{ token: string; user: User, message: string }> = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return { token: res.data.token, user: res.data.user, message: res.message };
};

// Verify Token
export const verifyToken = async (token: string): Promise<User> => {
  const res: ApiResponse<User> = await api("/auth/verify-token", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Complete Profile
export const completeUserProfile = async (
  user_name: string,
  verse_pace: string, 
  bible_translation: string,
  enable_notification: boolean,
  inspiration: string[],
  is_email_notification: boolean,
  is_web_notification: boolean,
  selected_time: string
): Promise<AuthResponse> => {

  const token = (await cookies()).get("token")?.value || "";

  const res: ApiResponse<User> = await api("/auth/complete-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_name,
      verse_pace,
      bible_translation,
      enable_notification,
      inspiration,
      is_email_notification,
      is_web_notification,
      // normalize selected_time: if client sent HH:MM convert to UTC ISO like 2025-11-15T14:30:00Z
      selected_time: (() => {
        try {
          if (/^\d{2}:\d{2}$/.test(selected_time)) {
            const [hh, mm] = selected_time.split(":").map(Number);
            // Interpret selected_time as local time chosen by the user,
            // then convert that local datetime to a UTC ISO string.
            const local = new Date();
            local.setHours(hh, mm, 0, 0);
            return local.toISOString().replace(/\.\d{3}Z$/, "Z");
          }
        } catch (e) {
        }
        return selected_time;
      })(),
    }),
  });
  return { status: res.status, success: res.success, message: res.message, data: res.data };
}


// Update User Profile
export const updateUserProfile = async (
  user_name: string,
  email: string, 
  verse_pace: string,
  bible_translation: string,
  enable_notification: boolean,
  inspiration: string[],
  is_email_notification: boolean,
  is_web_notification: boolean,
  selected_time: string
): Promise<AuthResponse> => {

  const token = (await cookies()).get("token")?.value || "";


  console.log("Updating user profile with :", user_name, email, verse_pace, bible_translation, enable_notification, inspiration, is_email_notification, is_web_notification, selected_time );

  const res: ApiResponse<User> = await api("/auth/update-profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_name,
      email,
      verse_pace,
      bible_translation,
      enable_notification,
      inspiration,
      is_email_notification,
      is_web_notification,
      selected_time: (() => {
        try {
          if (/^\d{2}:\d{2}$/.test(selected_time)) {
            const [hh, mm] = selected_time.split(":").map(Number);
            // Interpret selected_time as local time chosen by the user,
            // then convert that local datetime to a UTC ISO string.
            const local = new Date();
            local.setHours(hh, mm, 0, 0);
            return local.toISOString().replace(/\.\d{3}Z$/, "Z");
          }
        } catch (e) {
        }
        return selected_time;
      })(),
    }),
  });
  return { status: res.status, success: res.success, message: res.message, data: res.data };
}


// Get user Details
export const getUserDetails = async (): Promise<User> => {
  const token = (await cookies()).get("token")?.value || "";

  const res: ApiResponse<User> = await api("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 

  return res.data;
}


// Forget Password
export const sendResetOtp = async (email: string): Promise<{ message: string }> => {
  const res: ApiResponse<null> = await api("/auth/forget-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return { message: res.message };
}

// Reset Password
export const resetPassword = async (email: string, new_password: string, otp: string): Promise<{ message: string }> => {
  const res: ApiResponse<null> = await api("/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, new_password, otp }),
  });
  return { message: res.message };
}