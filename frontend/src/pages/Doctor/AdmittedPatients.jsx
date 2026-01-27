import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorSidebar from "../../components/doctor/Sidebar";
import VisitsTable from "../../components/doctor/Visits";

export default function AdmittedPatients() {
  const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmittedVisits = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/visit/admitted", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch admitted visits");

      setVisits(data.visits || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmittedVisits();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Admitted Patients</h2>
            <p className="text-gray-500">Patients currently on admission</p>
          </div>

          <button
            onClick={fetchAdmittedVisits}
            className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="bg-white p-6 rounded shadow">Loading...</p>}
        {error && <p className="bg-white p-6 rounded shadow text-red-600">{error}</p>}

        {!loading && !error && (
          <VisitsTable
            visits={visits}
            emptyText="No admitted patients."
            onOpen={(visitId) => navigate(`/doctor/visits/${visitId}`)}
          />
        )}
      </main>
    </div>
  );
}
