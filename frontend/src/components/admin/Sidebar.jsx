import { NavItem } from "./NavItems";
import { useNavigate } from "react-router-dom";
import LoggingOut from "../Logout";

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = LoggingOut();

  const hospitalName = localStorage.getItem("hospitalName") || "Hospital";
  const hospitalCode = localStorage.getItem("hospitalCode") || "";

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1e293b] border-r border-slate-200 dark:border-slate-700">
      <div className="p-6 flex flex-col gap-8 h-full">
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
              {hospitalCode ? `${hospitalCode} • Admin Portal` : "Admin Portal"}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem icon="dashboard" label="Dashboard" onClick={() => navigate("/admin/dashboard")} />
          <NavItem icon="groups" label="Staff Management" onClick={() => navigate("/admin/staffs")} />
          <NavItem icon="person" label="Patients" onClick={() => navigate("/admin/patients")} />
        </nav>

        <button onClick={logout} className="border-t pt-4 font-bold">
          Logout
        </button>
      </div>
    </aside>
  );
}
