import { NavLink } from "react-router-dom";
import SideFooter from "./SideFooter";

export default function DoctorSidebar() {
  const base = "px-3 py-2 rounded";
  const active = "bg-emerald-600/10 text-emerald-700 font-semibold";
  const idle = "text-gray-600 hover:bg-gray-100";

  const hospitalName = localStorage.getItem("hospitalName") || "Hospital";
  const hospitalCode = localStorage.getItem("hospitalCode") || "";

  return (
    <aside className="w-64 bg-white border-r p-6">
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
              {hospitalCode ? `${hospitalCode} • Doctor Portal` : "Doctor Portal"}
            </p>
          </div>
        </div>
      </div>

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
