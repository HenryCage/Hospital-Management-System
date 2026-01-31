import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PharmacySidebar from "../../components/pharmacy/Sidebar/sidebar";

export default function DispensedRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const displayName = (u) => {
    if (!u) return "-";
    const full = `${u.firstname || ""} ${u.lastname || ""}`.trim();
    return full || u.username || u.name || u.email || "-";
  };


  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:3000/pharmacy/dispensed-records", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.message || "Failed to load dispensed records");

        setRecords(data.records || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = records.filter((r) => {
    const p = r?.prescription?.patient;
    const name = `${p?.firstname || ""} ${p?.lastname || ""}`.toLowerCase();
    const pid = (p?.patientId || "").toLowerCase();
    const doc = (r?.prescription?.doctor?.username || r?.prescription?.doctor?.name || "").toLowerCase();
    const qq = q.trim().toLowerCase();
    if (!qq) return true;
    return name.includes(qq) || pid.includes(qq) || doc.includes(qq);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-screen w-64">
        <PharmacySidebar />
      </aside>

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dispensed Records</h2>
          <button
            onClick={() => navigate("/pharmacy/dashboard")}
            className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <label className="text-sm text-gray-600">Search (patient name / ID / doctor)</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            placeholder="Type to search..."
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Patient ID</th>
                  {/* <th className="p-3">Doctor</th> */}
                  <th className="p-3">Pharmacist</th>
                  <th className="p-3">Dispensed Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r) => {
                  const p = r?.prescription?.patient;
                  const d = r?.prescription?.doctor;
                  const pharm = r?.pharmacist;

                  return (
                    <tr key={r._id} className="border-t">
                      <td className="p-3">{p?.firstname} {p?.lastname}</td>
                      <td className="p-3">{p?.patientId}</td>
                      {/* <td className="p-3">{displayName(p.doctor)}</td> */}
                      <td className="p-3">{displayName(r.pharmacist)}</td>
                      <td className="p-3">
                        {new Date(r.timeDispensed || r.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-sm">
                          {r.status || "dispensed"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="p-6 text-center text-gray-600">No dispensed records found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
