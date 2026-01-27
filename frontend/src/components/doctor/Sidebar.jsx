import { NavLink } from "react-router-dom";
import SideFooter from "./SideFooter";

export default function DoctorSidebar() {
  const base = "px-3 py-2 rounded";
  const active = "bg-emerald-600/10 text-emerald-700 font-semibold";
  const idle = "text-gray-600 hover:bg-gray-100";

  return (
    <aside className="w-64 bg-white border-r p-6">
      <h2 className="text-xl font-bold mb-8">St. Jude Hospital</h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/pending"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          Pending Visits
        </NavLink>

        <NavLink
          to="/doctor/admitted"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          Admitted
        </NavLink>

        <NavLink
          to="/doctor/patients"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          Patient Lists
        </NavLink>
      </nav>
      <SideFooter />
    </aside>
  );
}
