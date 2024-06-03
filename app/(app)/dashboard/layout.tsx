"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  CreditCard,
  Home,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import useUserStore from "@/store/user-store";
import { usePathname } from "next/navigation";
import { DashboardNav } from "@/components/layout/nav";
import { dashboardConfig } from "@/config/dashboard";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const path = usePathname();

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
              <DashboardNav items={dashboardConfig.sidebarNav} />
            </div>
            <div className="mt-auto p-4">
              <Card className="bg-background">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
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
          <header className="flex justify-between md:justify-end h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
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
                        Unlock all features and get unlimited access to our
                        support team.
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
          <main className="flex flex-1 max-h-[calc(100vh-56px)] overflow-scroll no-scrollbar flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
