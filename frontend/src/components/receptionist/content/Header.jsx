export default function Header () {
  return (
    <header className="flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-black">Welcome back,</h1>
        <p className="text-[#617589]">Manage patient flow and registrations efficiently.</p>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-[#1a2634] px-4 py-2 rounded-full border">
        <span className="material-symbols-outlined text-primary">schedule</span>
        <span className="text-sm">Today, Oct 24 • 08:45 AM</span>
      </div>
    </header>
  );
}