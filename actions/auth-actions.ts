"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user as User | null;
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function sendMagicLink(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://www.ezdiagram.com/api/auth/callback/",
    },
  });

  if (error) {
    console.log("error: ", error);
    return error.message;
  }

  return { data, error };
}

export async function updateName(name: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      name: name,
    },
  });

  if (error) {
    console.error("Error updating name:", error);
    return error.message;
  }

  return data;
}

export async function deleteUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.auth.admin.deleteUser(user?.id);

  if (error) {
    console.error("Error deleting user:", error);
    return error.message;
  }
}
