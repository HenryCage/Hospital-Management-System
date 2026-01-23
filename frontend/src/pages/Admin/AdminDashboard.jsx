import React from "react";
import { useState, useEffect } from "react";
import { NavItem } from "../../components/admin/NavItems";
import { StatCard } from "../../components/admin/StatCard";
import { useNavigate } from "react-router-dom";
import LoggingOut from "../../components/Logout";


export default function AdminDashboard() {
  const logout = LoggingOut();
  const [staffCount, setStaffCount] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:3000/users/get/staffs/count", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const data = await res.json();
      setStaffCount(data.count)
    };

    fetchStaff();
  }, [])

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1e293b] border-r border-slate-200 dark:border-slate-700">
        <div className="p-6 flex flex-col gap-8 h-full">
          {/* Hospital Info */}
          <div className="flex gap-3 items-center">
            <div className="rounded-full size-12 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCP1QkyV3iVIr-hpR9Vglb8MeMSPD7IcEaIEfHuAeivnTlBaR1j4pu04EjNxqvPKPHEiezfUC9PNaHqMZZkAneEg099pewMSPJjvuFGxsQ0WpudBb8rAoCvkCEBOWNQlf93ZeW46JGePGup-K0M2IkbDCsk9wmxxeKDnRvIkRBF-wKxgeKjSHuVs61Od_m2xNb868YbkTPVRCoxrTe3lcAk663dk99-EZmZUbMcAH9bzrsWyvUFoyBUSLTAFV8nCcf6L3zqMXtuPWo")',
            }}/>
            <div>
              <h1 className="font-semibold">St. Mary's</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Portal</p>
            </div>
          </div>


          {/* Nav */}
          <nav className="flex flex-col gap-2 flex-1">
            <NavItem icon="dashboard" active label="Dashboard" />
            <NavItem icon="groups" label="Staff Management" onClick={() => navigate("/admin/staffs")} />
            <NavItem icon="person" label="Patients" />
            <NavItem icon="domain" label="Departments" />
          </nav>


          <button onClick={logout} className="border-t pt-4 text-bold">
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 px-8 py-4 flex justify-between items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur border-b">
          <input
          placeholder="Search patients, staff, or records..."
          className="w-full max-w-md px-4 py-2 rounded-lg border dark:bg-[#1e293b]"
          />
        </header>

        <div className="px-8 py-8 max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Overview of hospital operations
              </p>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold" onClick={() => navigate("/admin/create-staff")}>
              Register New Staff
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Patient Intake" value="142" />
            <StatCard title="Total Staff" value={staffCount} />
            <StatCard title="Bed Occupancy" value="87%" />
          </div>


          <div className="bg-white dark:bg-[#1e293b] rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b font-bold">Recent Check-ins</div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left">Patient</th>
                  <th className="px-6 py-3 text-left">Doctor</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}