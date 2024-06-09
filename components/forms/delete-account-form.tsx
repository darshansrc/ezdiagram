"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";
import useUserStore from "@/store/user-store";
import { deleteUser } from "@/actions/auth-actions";
import { IconSpinner } from "../ui/icons";
import toast from "react-hot-toast";

export function DeleteAccountForm() {
  const { user, fetchUser } = useUserStore();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDelete = (event) => {
    event.preventDefault();
    startTransition(async () => {
      await deleteUser();
      fetchUser();
      toast.success("Account deleted successfully!");
      setIsModalOpen(false);
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Card className="bg-background shadow-none">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Once you delete your account, there is no going back. Please be
            certain.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            type="button"
            className={cn(" rounded-full")}
            variant="destructive"
            onClick={openModal}
            disabled={isPending}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            <span>{isPending ? "Processing" : "Delete Account"}</span>
          </Button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <AlertDialog open={isModalOpen} onOpenChange={closeModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="p-4">
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
            </div>
            <AlertDialogFooter>
              <Button
                className={cn("rounded-full")}
                onClick={closeModal}
                disabled={isPending}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                className={cn("rounded-full")}
                onClick={onDelete}
                disabled={isPending}
              >
                {isPending && <IconSpinner className="mr-2 animate-spin" />}
                <span>{isPending ? "Deleting" : "Confirm Delete"}</span>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
