"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { useState } from "react";
import { Icons } from "@/components/shared/icons";
import { toast } from "react-hot-toast";
import { IconSpinner } from "../ui/icons";

export default function GithubSignInButton(props: { nextUrl?: string }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/api/auth/callback`,
        },
      });
    } catch (e) {
      console.log(e);
      toast.error("An error occured, please try google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex flex-row gap-2 items-center justify-center"
      onClick={handleLogin}
    >
      {loading ? (
        <>
          <IconSpinner /> <p>Continue with GitHub</p>
        </>
      ) : (
        <>
          <Icons.gitHub className="size-4" />
          <p>Continue with GitHub</p>
        </>
      )}
    </Button>
  );
}
