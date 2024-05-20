import { redirect } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { BillingInfo } from "@/components/billing-info";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Icons } from "@/components/shared/icons";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>Under work.</AlertTitle>
          <AlertDescription>
            This feature is still under work .
          </AlertDescription>
        </Alert>
        {/* <BillingInfo userSubscriptionPlan={userSubscriptionPlan} /> */}
      </div>
    </DashboardShell>
  );
}
