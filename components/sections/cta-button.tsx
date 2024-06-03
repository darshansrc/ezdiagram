"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Icons } from "../shared/icons";
import Link from "next/link";
import useUserStore from "@/store/user-store";
import useAuthModal from "@/store/auth-modal-store";

const CTAButton = () => {
  const { user } = useUserStore();
  const { setIsAuthModalOpen } = useAuthModal();

  if (!user) {
    return (
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className={cn(
          buttonVariants({ size: "lg" }),
          "gap-2 bg-black z-40 dark:bg-white rounded-full"
        )}
      >
        Start Editing
        <Icons.arrowRight className="size-4  " />
      </button>
    );
  }

  return (
    <Link
      href="/dashboard"
      className={cn(
        buttonVariants({ size: "lg" }),
        "gap-2 bg-black z-40 dark:bg-white rounded-full"
      )}
    >
      Start Editing
      <Icons.arrowRight className="size-4  " />
    </Link>
  );
};

export default CTAButton;
