// Mock data for the Week 3 admin dashboard.
// No database is wired up yet — swap these for real queries when one exists
// (see the README's "Week 3 notes" section for where each function is called).

export const MOCK_USERS = [
  { id: "u1", name: "Priya Shenoy", email: "priya@kavyalabs.ai", role: "Admin", status: "Active", joined: "2026-01-14" },
  { id: "u2", name: "Arjun Nair", email: "arjun@kavyalabs.ai", role: "Operator", status: "Active", joined: "2026-02-03" },
  { id: "u3", name: "Meera Iyer", email: "meera@kavyalabs.ai", role: "Operator", status: "Active", joined: "2026-02-20" },
  { id: "u4", name: "Rohan Mehta", email: "rohan@kavyalabs.ai", role: "Admin", status: "Active", joined: "2025-11-02" },
  { id: "u5", name: "Divya Krishnan", email: "divya@kavyalabs.ai", role: "Viewer", status: "Invited", joined: "2026-03-09" },
  { id: "u6", name: "Karthik Raman", email: "karthik@kavyalabs.ai", role: "Operator", status: "Suspended", joined: "2026-01-28" },
];

export const REQUEST_VOLUME = [
  { day: "Mon", count: 128 },
  { day: "Tue", count: 142 },
  { day: "Wed", count: 119 },
  { day: "Thu", count: 165 },
  { day: "Fri", count: 178 },
  { day: "Sat", count: 96 },
  { day: "Sun", count: 84 },
  { day: "Mon", count: 151 },
  { day: "Tue", count: 168 },
  { day: "Wed", count: 173 },
  { day: "Thu", count: 190 },
  { day: "Fri", count: 205 },
  { day: "Sat", count: 112 },
  { day: "Sun", count: 98 },
];

export const STATUS_BREAKDOWN = [
  { label: "Resolved", value: 842, kind: "good" },
  { label: "Pending", value: 96, kind: "warning" },
  { label: "Escalated", value: 23, kind: "critical" },
];

export function getStats() {
  const total = REQUEST_VOLUME.reduce((sum, d) => sum + d.count, 0);
  const avgPerDay = Math.round(total / REQUEST_VOLUME.length);
  const resolved = STATUS_BREAKDOWN.find((s) => s.label === "Resolved").value;
  const escalated = STATUS_BREAKDOWN.find((s) => s.label === "Escalated").value;
  const resolvedRate = Math.round((resolved / (resolved + escalated + 96)) * 100);

  return [
    { label: "Requests this week", value: total.toLocaleString() },
    { label: "Avg. per day", value: avgPerDay.toLocaleString() },
    { label: "Resolved without escalation", value: `${resolvedRate}%` },
    { label: "Active team members", value: MOCK_USERS.filter((u) => u.status === "Active").length },
  ];
}
