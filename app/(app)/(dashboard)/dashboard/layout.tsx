"use client";
import { DashboardNav } from "@/components/layout/nav";
import { NavBar } from "@/components/layout/navbar";
import { dashboardConfig } from "@/config/dashboard";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div>
        <NavBar items={dashboardConfig.mainNav} scroll={false} border={false} />
      </div>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
