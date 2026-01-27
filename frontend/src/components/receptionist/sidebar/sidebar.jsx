import { NavLink } from "react-router-dom";
import SideFooter from "./Sidefooter";

export default function Sidebar() {
  const base =
    "block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium";
  const active = "bg-gray-200 text-gray-900";

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Receptionist</h2>

      <nav className="space-y-2">
        <NavLink
          to="/rcp/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/rcp/patients"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Patients
        </NavLink>
      </nav>
      <SideFooter />
    </aside>
  );
}
