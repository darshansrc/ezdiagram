import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Workflow } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <div className="flex flex-row items-center gap-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Workflow className="size-5" />
        </Button>
        <h4 className="font-medium text-lg text-neutral-900 dark:text-white">
          EzDiagram
        </h4>

        <div className="absolute left-10 bottom-10 flex flex-row items-center gap-2">
          <Icons.spinner />
          <p className="text-sm font-medium text-muted-foreground">
            {" "}
            Loading Editor...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
