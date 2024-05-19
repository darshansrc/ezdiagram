"use server";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";
export type Diagram = Tables<"diagrams">;

export async function getAllDiagrams(): Promise<Diagram[] | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    const { data, error } = await supabase
      .from("diagrams")
      .select("*")
      .eq("user_id", user.id)
      .order("last_updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching diagrams:", error); // Log potential errors for debugging
      return null;
    }

    return data as Diagram[];
  }

  return null;
}

export async function deleteDiagram(id: string): Promise<boolean | string> {
  const supabase = createClient();

  const { error } = await supabase.from("diagrams").delete().eq("id", id);

  if (error) {
    return error.message;
  }

  return true;
}
