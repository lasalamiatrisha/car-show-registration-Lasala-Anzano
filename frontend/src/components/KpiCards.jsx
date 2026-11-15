import { Users, Wallet, AlertCircle, CheckCircle2, UserCheck } from "lucide-react";
import KpiCard from "./KpiCard";

const formatPhp = (amount) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount || 0);

export default function KpiCards({ summary, loading }) {
  if (loading && !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-200/70 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <KpiCard
        title="Total Registrations"
        value={summary?.totalRegistrations ?? 0}
        icon={Users}
        subtitle="All vehicle entries"
      />
      <KpiCard
        title="Total Payments"
        value={formatPhp(summary?.totalPayments)}
        icon={Wallet}
        subtitle="Collected fees"
        accentColor="text-emerald-700"
      />
      <KpiCard
        title="Uncollected Payments"
        value={formatPhp(summary?.uncollectedPayments)}
        icon={AlertCircle}
        subtitle="Remaining balance"
        accentColor="text-amber-700"
      />
      <KpiCard
        title="Confirmed"
        value={summary?.confirmed ?? 0}
        icon={CheckCircle2}
        subtitle="Approved participants"
        accentColor="text-blue-700"
      />
      <KpiCard
        title="Checked In"
        value={summary?.checkedIn ?? 0}
        icon={UserCheck}
        subtitle="Arrived at venue"
        accentColor="text-indigo-700"
      />
    </div>
  );
}