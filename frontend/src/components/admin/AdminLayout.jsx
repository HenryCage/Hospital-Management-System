import AdminSidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
