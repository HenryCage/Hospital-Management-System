export default function StatCard({ title, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow p-5 text-left hover:shadow-md transition"
      type="button"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm text-emerald-700 mt-3">View all →</p>
    </button>
  );
}
