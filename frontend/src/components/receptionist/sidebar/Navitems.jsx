export function NavItem({ icon, label, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
        ? "bg-primary/10 text-primary"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}