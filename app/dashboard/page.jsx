import StatTile from "@/components/dashboard/StatTile";
import RequestsChart from "@/components/dashboard/RequestsChart";
import StatusBreakdown from "@/components/dashboard/StatusBreakdown";
import { REQUEST_VOLUME, STATUS_BREAKDOWN, getStats } from "@/lib/mock-data";

export const metadata = {
  title: "Dashboard — Kavya Labs",
};

export default function DashboardOverview() {
  const stats = getStats();

  return (
    <div className="wrap md:px-8 py-8 md:py-10">
      <h1 className="font-serif font-medium text-2xl mb-1">Overview</h1>
      <p className="text-kavya-muted text-sm mb-8">
        Last 14 days. Data shown here is illustrative — connect a real queue to replace it.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-8">
        <div className="bg-kavya-panel border border-kavya-line rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-4">Requests handled per day</h2>
          <RequestsChart data={REQUEST_VOLUME} />
        </div>

        <div className="bg-kavya-panel border border-kavya-line rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-4">This week&apos;s outcomes</h2>
          <StatusBreakdown data={STATUS_BREAKDOWN} />
        </div>
      </div>
    </div>
  );
}
