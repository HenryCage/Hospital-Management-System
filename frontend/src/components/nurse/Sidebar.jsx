import { NavLink } from "react-router-dom";
import SideFooter from "./SideFooter";

export default function NurseSidebar() {
  const base =
    "block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium";
  const active = "bg-gray-200 text-gray-900";

  const hospitalName = localStorage.getItem("hospitalName") || "Hospital";
  const hospitalCode = localStorage.getItem("hospitalCode") || "";

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col h-screenw-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1e293b] border-r border-slate-200 dark:border-slate-700">
      <div className="p-6 flex flex-col gap-8 ">
        <div className="flex gap-3 items-center">
          <div
            className="rounded-full size-12 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCP1QkyV3iVIr-hpR9Vglb8MeMSPD7IcEaIEfHuAeivnTlBaR1j4pu04EjNxqvPKPHEiezfUC9PNaHqMZZkAneEg099pewMSPJjvuFGxsQ0WpudBb8rAoCvkCEBOWNQlf93ZeW46JGePGup-K0M2IkbDCsk9wmxxeKDnRvIkRBF-wKxgeKjSHuVs61Od_m2xNb868YbkTPVRCoxrTe3lcAk663dk99-EZmZUbMcAH9bzrsWyvUFoyBUSLTAFV8nCcf6L3zqMXtuPWo")',
            }}
          />
          <div>
            <h1 className="font-semibold leading-tight">{hospitalName}</h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {hospitalCode ? `${hospitalCode} • Nurse Portal` : "Nurse Portal"}
            </p>
          </div>
        </div>
      </div>

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
