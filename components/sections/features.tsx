import Link from "next/link";

import { features } from "@/config/landing";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";

export function Features() {
  return (
    <section>
      <div className="pb-6 pt-28">
        <div className="container max-w-6xl">
          <HeaderSection label="Use Case" title="Perfect For" subtitle="" />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                className="group relative overflow-hidden shadow-sm rounded-2xl border bg-background p-4 md:p-6"
                key={feature.title}
              >
                {/* <div
                  aria-hidden="true"
                  className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-purple-500/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                /> */}
                <div className="relative">
                  <p className="mt-0 pb-2  font-medium">{feature.title}</p>

                  <div className="-mb-5 flex gap-3 border-t  text-sm text-muted-foreground  py-2 pb-6 md:-mb-7">
                    <span>{feature.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
