import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { StatCard } from "../../components/admin/StatCard";

export default function AdminDashboard() {
  const [staffCount, setStaffCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hospitalName = localStorage.getItem("hospitalName") || "Hospital";
    const hospitalCode = localStorage.getItem("hospitalCode") || "";


    const fetchCounts = async () => {
      const [staffRes, patientRes] = await Promise.all([
        fetch("http://localhost:3000/users/staffs/count", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/users/patients/count", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const staffData = await staffRes.json().catch(() => null);
      const patientData = await patientRes.json().catch(() => null);

      setStaffCount(staffData?.count || 0);
      setPatientCount(patientData?.count || 0);
    };

    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <header className="sticky top-0 z-20 px-8 py-4 flex justify-between items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur border-b">
        <input
          placeholder="Search patients, staff, or records..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-[#1e293b]"
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

          <button
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold"
            onClick={() => navigate("/admin/create-staff")}
          >
            Register New Staff
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Patient Intake" value={patientCount} />
          <StatCard title="Total Staff" value={staffCount} />
        </div>
      </div>
    </AdminLayout>
  );
}
