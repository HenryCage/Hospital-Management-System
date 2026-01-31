import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/doctor/Sidebar";
import { formatDate } from '../../utils/date';

export default function VisitHistory() {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/visit/${visitId}/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch visit history");

        setVisit(data.visit);
        setItems(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitDetails();
  }, [visitId]);

  if (loading) return <p className="p-8">Loading history...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!visit) return <p className="p-8">No history found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </aside>

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Visit History</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
          >
            Back
          </button>
        </div>

        {/* Visit Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-semibold">Visit Date:</span> {formatDate(visit.createdAt)}</p>
            <p><span className="font-semibold">Status:</span> {visit.status || "N/A"}</p>
            <p>
              <span className="font-semibold">Patient:</span>{" "}
              {visit.patient?.firstname} {visit.patient?.lastname}
            </p>
            <p><span className="font-semibold">Patient ID:</span> {visit.patient?.patientId}</p>
          </div>
        </div>

        {/* Doctor Notes / Complaint / Diagnosis (whatever you store) */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">Clinical Notes</h3>

          <div className="space-y-3">
            <p><span className="font-semibold">Complaint:</span> {visit.complaint || "—"}</p>
            <p><span className="font-semibold">Diagnosis:</span> {visit.diagnosis || "—"}</p>
            <p><span className="font-semibold">Doctor Notes:</span> {visit.notes || "—"}</p>
          </div>
        </div>

        {/* Prescription / Items (optional based on your DB) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3">Prescription / Items</h3>

          {items.length === 0 ? (
            <p className="text-gray-600">No items recorded for this visit.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-3 font-semibold">Drug</th>
                    <th className="p-3 font-semibold">Dosage</th>
                    <th className="p-3 font-semibold">Frequency</th>
                    <th className="p-3 font-semibold">Duration</th>
                    <th className="p-3 font-semibold">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3">{it.drug?.name || it.drugName || "—"}</td>
                      <td className="p-3">{it.dosage || "—"}</td>
                      <td className="p-3">{it.frequency || "—"}</td>
                      <td className="p-3">{it.duration || "—"}</td>
                      <td className="p-3">{it.quantityRequested ?? it.qty ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
