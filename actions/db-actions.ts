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
      console.error("Error fetching diagrams:", error);
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

export async function updateDiagramName(
  id: string,
  name: string
): Promise<boolean | string> {
  const supabase = createClient();

  const { error } = await supabase
    .from("diagrams")
    .update({ diagram_name: name })
    .eq("id", id);

  if (error) {
    return error.message;
  }

  return true;
}

export async function getDiagram(id: string): Promise<Diagram | string> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("diagrams")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return error.message;
  }

  return data;
}

export async function updateDiagramCode(id: string, code: string) {
  const supabase = createClient();

  await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("diagrams")
    .update({ code: code, last_updated_at: new Date() })
    .eq("id", id)
    .select();

  if (error) {
    return error.message;
  }

  return data;
}

export async function updateDiagramConfig(id: string, config: string) {
  const supabase = createClient();

  await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("diagrams")
    .update({ config: config, last_updated_at: new Date() })
    .eq("id", id)
    .select();

  if (error) {
    return error.message;
  }

  return data;
}

export async function updateDiagramNotes(id: string, notes: string) {
  const supabase = createClient();

  await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("diagrams")
    .update({ diagram_notes: notes, last_updated_at: new Date() })
    .eq("id", id)
    .select();

  if (error) {
    return error.message;
  }

  return data;
}
