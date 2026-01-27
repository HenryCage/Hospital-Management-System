import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorSidebar from "../../components/doctor/Sidebar";
import VisitsTable from "../../components/doctor/Visits";

export default function PendingVisits() {
  const navigate = useNavigate();
  const [visit, setVisit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingVisits = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/visit/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {}

      if (!res.ok) throw new Error(data?.message || "Failed to fetch pending visits");

      setVisit(data.visit || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVisits();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Pending Visits</h2>
            <p className="text-gray-500">Patients waiting for consultation</p>
          </div>

          <button
            onClick={fetchPendingVisits}
            className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="bg-white p-6 rounded shadow">Loading...</p>}
        {error && <p className="bg-white p-6 rounded shadow text-red-600">{error}</p>}

        {!loading && !error && (
          <VisitsTable
            visits={visit}
            emptyText="No pending patients."
            onOpen={(visitId) => navigate(`/doctor/visits/${visitId}`)}
          />
        )}
      </main>
    </div>
  );
}
