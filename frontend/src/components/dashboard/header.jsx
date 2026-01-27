export default function DashboardHeader({ title, subtitle, badge, emoji, name }) {
  return (
    <div className="mb-8 bg-white rounded-xl shadow p-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome {name ? name : title}
        </h2>

        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}

        {badge && <p className="text-sm text-gray-400 mt-1">{badge}</p>}
      </div>

      <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 text-gray-800 font-bold text-xl">
        {emoji || "🏥"}
      </div>
    </div>
  );
}
