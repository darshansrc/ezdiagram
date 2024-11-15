import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/utils/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { ArrowRight } from "lucide-react";
import RetroGrid from "../magicui/retro-grid";
import ShimmerButton from "../magicui/shimmer-button";
import CTAButton from "./cta-button";

export async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <RetroGrid />
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* Want animations? Check here: https://github.com/mickasmt/next-saas-stripe-starter/blob/76eb9f2b70b29c7a734ff0e5b047796ed2dac28d/app/(marketing)/page.tsx */}
        {/* <Link
          href="https://chatmermaid.com/blog/claude-support"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 rounded-full"
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> Introducing support for GPT-4o{" "}
          <ArrowRight className="size-4 pl-1" />
        </Link> */}

        <h1 className="text-balance font-urban text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Diagram as Code <br /> made eazy with{" "}
          <span className="text-gradient_indigo-purple font-extrabold">AI</span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl "
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Create, edit and customize Mermaid.js and PlantUML diagrams in seconds
          with EzDiagram.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <CTAButton />

          {/* <Link href="/dashboard" prefetch={false}>
            <ShimmerButton className="shadow-2xl  ">
              <span className="whitespace-pre-wrap text-center flex flex-row items-center gap-2 text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Start Editing
                <Icons.arrowRight className="size-4  " />
              </span>
            </ShimmerButton>
          </Link> */}
        </div>
      </div>
    </section>
  );
}
