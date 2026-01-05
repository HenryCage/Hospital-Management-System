export default function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-[#1a2634] border rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[#617589]">
        <span className="material-symbols-outlined">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}