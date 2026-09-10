export default function StatCard({ label, value, hint, accent = "navy" }) {
  const accentClasses =
    accent === "gold" ? "text-gold-600 bg-gold-500/10" : "text-navy-800 bg-navy-900/5";

  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${accentClasses}`}>
          {hint}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-navy-900">
        {value}
      </p>
    </div>
  );
}
