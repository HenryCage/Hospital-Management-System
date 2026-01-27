import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DoctorSidebar from "../../components/doctor/Sidebar";
import StatCard from "../../components/doctor/StatCard";
import DashboardHeader from "../../components/dashboard/header";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pendingCount, setPendingCount] = useState(0);
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

      const [pendingRes, admittedRes] = await Promise.all([
        fetch("http://localhost:3000/visit/count?status=pending", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
        fetch("http://localhost:3000/visit/count?status=admitted", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
      ]);

      const pendingData = await pendingRes.json();
      const admittedData = await admittedRes.json();

      if (!pendingRes.ok) {
        throw new Error(pendingData?.message || "Failed to fetch pending count");
      }

      if (!admittedRes.ok) {
        throw new Error(admittedData?.message || "Failed to fetch admitted count");
      }

      setPendingCount(pendingData.count || 0);
      setAdmittedCount(admittedData.count || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [location.pathname]);

  const user = JSON.parse(localStorage.getItem("user"));
  const displayName = user?.fullname || user?.name || "Doctor";


  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
          <p className="text-gray-500">{today}</p>
        </div>

        <DashboardHeader title={displayName} emoji="🏥" name={displayName} />
        
        {loading && <p className="bg-white p-6 rounded shadow">Loading...</p>}
        {error && (
          <p className="bg-white p-6 rounded shadow text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="Pending Patients"
              value={pendingCount}
              onClick={() => navigate("/doctor/pending")}
            />

            <StatCard
              title="Admitted Patients"
              value={admittedCount}
              onClick={() => navigate("/doctor/admitted")}
            />
          </div>
        )}
      </main>
    </div>
  );
}
