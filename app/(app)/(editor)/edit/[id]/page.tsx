import { Diagram, getDiagram } from "@/actions/db-actions";
import React from "react";
import EditorDashboard from "./editor-dashboard";

const Editor = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const diagram = (await getDiagram(params.id)) as Diagram;
  return (
    <div className="editor">
      <EditorDashboard diagram={diagram} />
    </div>
  );
};

export default Editor;
