import { NavLink } from "react-router-dom";
import SideFooter from "./SideFooter";

export default function PharmacySidebar() {
  const base =
    "block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium";
  const active = "bg-gray-200 text-gray-900";

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Pharmacy</h2>

      <nav className="space-y-2">
        <NavLink
          to="/pharmacy/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/pharmacy/prescriptions"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Prescriptions
        </NavLink>

        <NavLink
          to="/pharmacy/dispensed"
          className={({ isActive }) => `${base} ${isActive ? active : ""}`}
        >
          Dispensed Records
        </NavLink>

      </nav>

      <SideFooter />
    </aside>
  );
}
