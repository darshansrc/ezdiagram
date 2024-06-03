import { Button } from "@/components/ui/button";
import { ChevronLeft, OctagonAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center w-full h-screen">
      <OctagonAlert className="size-10 mb-2 text-yellow-400 dark:text-yellow-600" />{" "}
      <h4 className="text-lg font-medium flex flex-row items-center">
        404 <span className="text-muted-foreground  px-1">|</span> This page
        could not be found.
      </h4>
      <p className="text-muted-foreground text-sm text-center">
        The page you&apos;re looking for does not exist. <br /> But don't worry,
        you still do.
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
};

export default NotFound;
