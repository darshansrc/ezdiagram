import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/utils/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* Want animations? Check here: https://github.com/mickasmt/next-saas-stripe-starter/blob/76eb9f2b70b29c7a734ff0e5b047796ed2dac28d/app/(marketing)/page.tsx */}
        <Link
          href="https://twitter.com/miickasmt/status/1719892161095745801"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4"
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> Introducing support for Claude
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Unleash the Power of{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            AI Diagramming
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Create stunning and professional diagrams in seconds with the help of
          AI.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2"
            )}
          >
            <span>Start Editing</span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
