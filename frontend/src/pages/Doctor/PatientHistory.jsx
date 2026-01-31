import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorSidebar from "../../components/doctor/Sidebar";
import { formatDate } from "../../utils/date";

const getAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "";
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
};

const statusBadge = (status) => {
  const base = "inline-block px-2 py-1 rounded text-xs font-semibold";
  if (status === "pending") return `${base} bg-yellow-100 text-yellow-800`;
  if (status === "admitted") return `${base} bg-emerald-100 text-emerald-800`;
  if (status === "concluded") return `${base} bg-blue-100 text-blue-800`;
  return `${base} bg-gray-100 text-gray-700`;
};

export default function DoctorPatientHistory() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/visit/patient/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch history");

      const v = data.visit || [];
      setVisits(v);

      setPatient(v[0]?.patient || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [patientId]);

  const openVisit = (visitId) => {
    navigate(`/doctor/visits/${visitId}/history`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Medical History</h2>

            {patient ? (
              <p className="text-gray-600">
                {patient.firstname} {patient.lastname} • {patient.patientId} •{" "}
                {patient.gender} • Age: {getAge(patient.dob) || "-"}
              </p>
            ) : (
              <p className="text-gray-600">Patient history</p>
            )}
          </div>

          <button
            onClick={fetchHistory}
            className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="bg-white p-6 rounded shadow">Loading...</p>}
        {error && (
          <p className="bg-white p-6 rounded shadow text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {visits.map((v) => (
                  <tr key={v._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{formatDate(v.createdAt)}</td>
                    <td className="p-3">
                      <span className={statusBadge(v.status)}>{v.status}</span>
                    </td>
                    <td className="p-3">
                      {v.diagnosis
                        ? v.diagnosis.length > 60
                          ? v.diagnosis.slice(0, 60) + "..."
                          : v.diagnosis
                        : "-"}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openVisit(v._id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {visits.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-600">
                      No visit history found for this patient.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
