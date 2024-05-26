"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import useAuthModal from "@/store/auth-modal-store";
import GoogleSignInButton from "./google-oauth-button";
import GithubSignInButton from "./github-oauth-button";
import { sendMagicLink } from "@/actions/auth-actions";
import { toast } from "react-hot-toast";
import Link from "next/link";
import useUserStore from "@/store/user-store";
import { IconSpinner } from "../ui/icons";
import { Check, Send } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useAuthModal();
  const [showEmailForm, setShowEmailForm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { fetchUser } = useUserStore();

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleContinueWithEmail = () => {
    setShowEmailForm(true);
  };

  const handleBackToOAuth = () => {
    setShowEmailForm(false);
  };

  const handleSendMagicLink = async () => {
    setIsSendingEmail(true);
    await sendMagicLink(email);
    setIsSendingEmail(false);
    setIsEmailSent(true);
    setIsAuthModalOpen(false);
    setEmail("");
    setShowEmailForm(false);
    toast.success("Magic link sent to your email");
  };

  const OAuthButtons = ({ className }: React.ComponentProps<"div">) => {
    return (
      <div className={cn("grid items-start gap-4", className)}>
        <DialogHeader>
          <DialogTitle className={"text-left pl-2"}>
            Login or Signup
          </DialogTitle>
          <DialogDescription className="pt-2 pb-6 text-left pl-2">
            By continuing you agree to our{" "}
            <Link
              href={"/terms-and-conditions"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Terms of Services
            </Link>{" "}
            and{" "}
            <Link
              href={"/privacy-policy"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Privacy policy
            </Link>
          </DialogDescription>
        </DialogHeader>
        <GoogleSignInButton />
        <GithubSignInButton />
        <Button variant="link" onClick={handleContinueWithEmail}>
          Continue with email
        </Button>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {showEmailForm ? (
            <div className={cn("grid items-start gap-4")}>
              <DialogHeader>
                <DialogTitle className={"text-left pl-2"}>
                  Continue with an email link 💌
                </DialogTitle>
                <DialogDescription className="pt-2 pb-6 text-left pl-2">
                  Enter your email and we&apos;ll send you a link to create a
                  new profile.
                </DialogDescription>
              </DialogHeader>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-row gap-2 items-center justify-end">
                <Button variant="link" onClick={handleBackToOAuth}>
                  Back
                </Button>
                <Button variant="default" onClick={handleSendMagicLink}>
                  {isSendingEmail ? (
                    <div className="flex flex-row items-center gap-2">
                      <IconSpinner className="size-4" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex flex-row items-center gap-2">
                      <Send className="size-4" /> Send Link
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <OAuthButtons />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DrawerContent className="h-[450px]">
        <div className="text-left pt-6 pb-32 px-4">
          {showEmailForm ? (
            <div className={cn("grid items-start gap-4")}>
              <DialogHeader>
                <DialogTitle className={"text-left pl-2"}>
                  Continue with an email link 💌
                </DialogTitle>
                <DialogDescription className="pt-2 pb-6 text-left pl-2">
                  Enter your email and we&apos;ll send you a link to create a
                  new profile.
                </DialogDescription>
              </DialogHeader>
              <Input
                type="email"
                placeholder="Enter Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-row gap-2 items-center justify-end">
                <Button variant="link" onClick={handleBackToOAuth}>
                  Back
                </Button>
                <Button variant="default" onClick={handleSendMagicLink}>
                  {isSendingEmail
                    ? "Sending..."
                    : isEmailSent
                    ? "  Magic Email Sent"
                    : "Send Magic Link"}
                </Button>
              </div>
            </div>
          ) : (
            <OAuthButtons />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
