import Link from "next/link";
import { Plus, User, Users, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { siteConfig } from "@/config/site";

import useUserStore from "@/store/user-store";
import { DashboardNav } from "@/components/layout/nav";
import { dashboardConfig } from "@/config/dashboard";
import DashboardNavbar from "./dashboard-navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="fixed h-screen w-screen min-w-screen min-h-screen max-h-screen max-w-screen bg-background  ">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r  md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Workflow className="h-6 w-6" />
                <span className=""> {siteConfig.name}</span>
              </Link>
            </div>
            <div className="flex-1 mt-4">
              <div className="mb-6">
                <p className="text-[12px] mb-2 flex flex-row items-center gap-2 pl-6 text-muted-foreground py-2 font-medium">
                  <User className="size-4" /> Your Account
                </p>
                <DashboardNav items={dashboardConfig.sidebarNav} />
              </div>

              <div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-[12px] pl-6 flex flex-row items-center gap-2 text-muted-foreground py-2 font-medium">
                    <Users className="size-4" /> Teams
                  </p>
                  <Plus className="h-4 w-4 text-muted-foreground mr-4" />
                </div>
              </div>
            </div>

            <div className="mt-auto p-4">
              <Card className="bg-background">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro 🚀</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full rounded-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <DashboardNavbar />
          <main className="flex flex-1 max-h-[calc(100vh-56px)] overflow-scroll no-scrollbar flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
