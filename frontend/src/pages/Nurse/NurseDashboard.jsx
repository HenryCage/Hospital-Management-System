import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NurseSidebar from "../../components/nurse/Sidebar";
import StatCard from "../../components/doctor/StatCard";
import DashboardHeader from "../../components/dashboard/header";

export default function NurseDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [admittedCount, setAdmittedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fetchCounts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/visit/count?status=admitted",
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch count");

      setAdmittedCount(data.count || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      <NurseSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Nurse Dashboard</h2>
          <p className="text-gray-500">{today}</p>
        </div>

        <DashboardHeader name="Nurse" />

        {loading && <p className="bg-white p-6 rounded shadow">Loading...</p>}
        {error && (
          <p className="bg-white p-6 rounded shadow text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="Admitted Patients"
              value={admittedCount}
              onClick={() => navigate("/nurse/admitted")}
            />
          </div>
        )}
      </main>
    </div>
  );
}
