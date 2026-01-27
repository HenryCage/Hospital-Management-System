export default function DoctorHeader({ title, subtitle, onRefresh, refreshing }) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>

      <button
        onClick={onRefresh}
        disabled={refreshing}
        className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
