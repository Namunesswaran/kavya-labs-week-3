export default function StatTile({ label, value }) {
  return (
    <div className="bg-kavya-panel border border-kavya-line rounded-lg px-5 py-4">
      <div className="text-kavya-muted text-[0.82rem] mb-1.5">{label}</div>
      <div className="font-serif text-[1.9rem] leading-none">{value}</div>
    </div>
  );
}
