import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NurseSidebar from "../../components/nurse/Sidebar";
import VisitsTable from "../../components/doctor/Visits";

export default function NurseAdmittedPatients() {
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmitted = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/visit/admitted", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch admitted");

      setVisits(data.visits || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmitted();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <NurseSidebar />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admitted Patients
              </h2>
              <p className="text-gray-600 mt-1">
                Record vitals for admitted patients
              </p>
            </div>

            <button
              onClick={fetchAdmitted}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Status */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600 shadow-sm">
              Loading admitted patients...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 shadow-sm">
              {error}
            </div>
          )}

          {/* Table wrapper */}
          {!loading && !error && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Currently Admitted
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Total: <span className="font-semibold">{visits.length}</span>
                </p>
              </div>

              <div className="p-4 md:p-6">
                <VisitsTable
                  visits={visits}
                  emptyText="No admitted patients."
                  onOpen={(visitId) => navigate(`/nurse/visits/${visitId}/vitals`)}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
