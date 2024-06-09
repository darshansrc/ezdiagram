import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { UserNameForm } from "@/components/forms/user-name-form";
import { DeleteAccountForm } from "@/components/forms/delete-account-form";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm />
        <DeleteAccountForm />
      </div>
    </DashboardShell>
  );
}
