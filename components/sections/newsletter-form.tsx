"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export function NewsletterForm() {
  return (
    <form className="w-full space-y-2 sm:max-w-sm">
      <Label>Subscribe to our newsletter</Label>
      <Input
        type="email"
        className="rounded-full px-4"
        placeholder="janedoe@example.com"
      />

      <Button type="submit" size="sm" className="px-4 rounded-full">
        Subscribe
      </Button>
    </form>
  );
}
