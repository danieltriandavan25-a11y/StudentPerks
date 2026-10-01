import { Button, EmptyState } from "../../components/ui";
import { EmptyDoodle } from "../../components/illustrations";
import DashboardLayout, { Stat } from "../../layouts/DashboardLayout";

export default function BusinessDashboard() {
  return (
    <DashboardLayout role="Business" title="Your offers" subtitle="Publish and track student discounts."
      action={<Button>New offer</Button>}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active offers" value="0" />
        <Stat label="Redemptions" value="0" note="Last 30 days" />
        <Stat label="Profile views" value="0" note="Last 30 days" />
      </div>
      <EmptyState icon={<EmptyDoodle />} title="No offers yet"
        description="Create your first offer and it will appear to students nearby once approved."
        action={<Button>Create an offer</Button>} />
    </DashboardLayout>
  );
}
