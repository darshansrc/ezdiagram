"use client";

import { MainNavItem } from "@/types";
import useScroll from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";

import { Icons } from "../shared/icons";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";
import useAuthModal from "@/store/auth-modal-store";
import useUser from "@/store/user-store";
import { useMounted } from "@/hooks/use-mounted";
import { ModeToggle } from "./mode-toggle";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
  border?: boolean;
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
  border = true,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const { user } = useUser();
  const { isAuthModalOpen, setIsAuthModalOpen } = useAuthModal();
  const mounted = useMounted();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll
          ? scrolled
            ? border && "border-b"
            : "bg-background/0"
          : border && "border-b"
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {user ? (
            <>
              <ModeToggle />
              <UserAccountNav user={user} />
            </>
          ) : (
            mounted && (
              <Button
                className="gap-2 px-4 rounded-full"
                variant="default"
                onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
              >
                <span>Sign In</span>
                <Icons.arrowRight className="size-4" />
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
