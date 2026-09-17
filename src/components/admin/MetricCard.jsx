export default function MetricCard({ title, value, icon: Icon, accent = "text-forest", bg = "bg-forest/10" }) {
  return (
    <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-charcoal">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
          <Icon className={`h-5 w-5 ${accent}`} />
        </div>
      </div>
    </div>
  );
}
