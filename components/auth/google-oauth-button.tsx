"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { useState } from "react";
import { Icons } from "@/components/shared/icons";

export default function GoogleSignInButton(props: { nextUrl?: string }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      className="w-full flex flex-row gap-2 items-center justify-center"
      onClick={handleLogin}
    >
      {loading ? (
        <>
          {Icons.spinner} <p>Please wait...</p>
        </>
      ) : (
        <>
          <Icons.google className="size-4" />
          <p>Continue with Google</p>
        </>
      )}
    </Button>
  );
}
