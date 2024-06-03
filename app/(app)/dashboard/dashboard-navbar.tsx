"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import { Button } from "@/components/ui/button";
import { Menu, Workflow } from "lucide-react";
import Link from "next/link";
import { DashboardNav } from "@/components/layout/nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUserStore from "@/store/user-store";
import { dashboardConfig } from "@/config/dashboard";

const DashboardNavbar = () => {
  const { user } = useUserStore();
  return (
    <header className="flex justify-between md:justify-end h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Workflow className="h-6 w-6" />
              <span>EzDiagram</span>
            </Link>
            <div className="flex-1 mt-4">
              <DashboardNav items={dashboardConfig.sidebarNav} />
            </div>
          </nav>
          <div className="mt-auto">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-row items-center gap-2">
        <ModeToggle />
        <UserAccountNav user={user} />
      </div>
    </header>
  );
};

export default DashboardNavbar;
