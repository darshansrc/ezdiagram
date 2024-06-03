import { createClient } from "@/utils/supabase/server";
import Dashboard from "./dashboard";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ChevronLeft, OctagonAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
