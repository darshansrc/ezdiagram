import { NavBar } from "@/components/layout/navbar";
import Banner from "@/components/sections/banner";

import { marketingConfig } from "@/config/marketing";
import { Suspense } from "react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col ">
      <div>
        <Banner />
        <NavBar items={marketingConfig.mainNav} scroll={true} />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
