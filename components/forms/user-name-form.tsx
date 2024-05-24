"use client";

import { useState, useTransition } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";
import useUserStore from "@/store/user-store";
import { updateName } from "@/actions/auth-actions";
import { IconSpinner } from "../ui/icons";

export function UserNameForm() {
  const { user, fetchUser } = useUserStore();
  const [isPending, startTransition] = useTransition();
  const [newName, setNewName] = useState<string>("");

  const onSubmit = (data: any) => {
    event?.preventDefault();
    startTransition(async () => {
      await updateName(newName);
      fetchUser();
      toast({
        description: "Your name has been updated.",
      });
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-full sm:w-[400px] rounded-full"
              size={32}
              defaultValue={user?.user_metadata.name}
              onChange={(e) => setNewName(e.target.value)}
            />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), "rounded-full ")}
            disabled={isPending}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            <span>{isPending ? "Saving" : "Save"}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
