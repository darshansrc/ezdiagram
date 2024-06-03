import { Diagram, getDiagram } from "@/actions/db-actions";
import React from "react";
import EditorDashboard from "./editor-dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  ChevronLeft,
  FileWarning,
  MessageCircleWarning,
  OctagonAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Editor = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const diagram = (await getDiagram(params.id)) as Diagram;

  const isCreator = user?.id === diagram?.user_id;

  if (!user || !isCreator || !diagram) {
    return (
      <div className="flex flex-col items-center gap-2 justify-center w-full h-screen">
        <OctagonAlert className="size-10 mb-2 text-yellow-400 dark:text-yellow-600" />{" "}
        <h4 className="text-lg font-medium flex flex-row items-center">
          404 <span className="text-muted-foreground  px-1">|</span> This page
          could not be found.
        </h4>
        <p className="text-muted-foreground text-sm text-center">
          Oops! The diagram you’re looking for isn’t here, <br /> or it hasn’t
          been shared with you.
        </p>
        <Link href={"/"} className="mt-4">
          <Button
            size="sm"
            className="rounded-full flex flex-row items-center gap-1"
          >
            <ChevronLeft className="size-3" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="editor">
      <EditorDashboard diagram={diagram} />
    </div>
  );
};

export default Editor;
