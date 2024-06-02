"use server";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/supabase";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { customAlphabet, nanoid } from "nanoid";
import { redirect } from "next/navigation";
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

interface DiagramVersionData {
  version_name?: string;
  diagram_id: string;
  diagram_code: string;
  diagram_config: string;
  diagram_notes: string;
  diagram_language?: string;
  diagram_theme?: string;
}

export async function saveDiagramVersion(data: DiagramVersionData) {
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data: insertedData, error } = await supabase
    .from("diagram_versions")
    .upsert({
      version_name: data.version_name,
      diagram_id: data.diagram_id,
      diagram_code: data.diagram_code,
      diagram_config: data.diagram_config,
      diagram_notes: data.diagram_notes,
      diagram_language: data.diagram_language || "mermaid",
      diagram_theme: data.diagram_theme || "default",
    });
  if (error) {
    console.error("Error saving diagram version:", error);
    return error.message;
  }
  return insertedData;
}

export async function fetchDiagramVersions(id: string) {
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("diagram_versions")
    .select("*")
    .eq("diagram_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching diagram versions:", error);
    return error.message;
  }
  return data;
}

interface NewDiagram {
  diagram_name: string;
  diagram_language?: string;
}

export async function createNewDiagram(diagram: NewDiagram) {
  const newNanoid = customAlphabet("abcdefhiklmnorstuvwxz", 10);
  const id = newNanoid();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && user.id) {
    return;
  }
  const { data, error } = await supabase
    .from("diagrams")
    .insert({
      id: id,
      user_id: user?.id,
      code: `graph TD\n  A[Your Diagram will appear here! 🤘📈]\n `,
      diagram_name: diagram.diagram_name,
      diagram_language: diagram.diagram_language,
    })
    .single();

  if (error) {
    console.error("Error creating new diagram:", error);
    return error.message;
  }
  redirect(`/edit/${id}`);
}
