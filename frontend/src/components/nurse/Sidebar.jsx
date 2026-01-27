import { NavLink } from "react-router-dom";
import SideFooter from "./SideFooter";

export default function NurseSidebar() {
  const base =
    "block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium";
  const active = "bg-gray-200 text-gray-900";

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Nurse</h2>

      <nav className="space-y-2">
        <NavLink
          to="/nurse/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/nurse/admitted"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Admitted Patients
        </NavLink>
      </nav>
      <SideFooter />
    </aside>
  );
}
