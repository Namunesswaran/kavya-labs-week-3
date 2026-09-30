const STATUS_STYLES = {
  good: { bar: "#3AA87F", icon: "✓" },
  warning: { bar: "#C4821F", icon: "!" },
  critical: { bar: "#D6524A", icon: "×" },
};

export default function StatusBreakdown({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col gap-4">
      {data.map((d) => {
        const pct = Math.round((d.value / total) * 100);
        const style = STATUS_STYLES[d.kind];
        return (
          <div key={d.label}>
            <div className="flex items-center justify-between mb-1.5 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: style.bar, color: "#1C1A22" }}
                >
                  {style.icon}
                </span>
                {d.label}
              </span>
              <span className="text-kavya-muted">
                {d.value} · {pct}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-kavya-bg overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: style.bar }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
