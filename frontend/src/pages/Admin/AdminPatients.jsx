import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const getAge = (dob) => {
  if (!dob) return "-";
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return "-";
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
};

export default function AdminPatients() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [patients, setPatients] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Use your endpoint style (adjust if yours differs)
      const res = await fetch("http://localhost:3000/patient/getpatients", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to fetch patients");

      const list = data?.patients || data?.patient || data || [];
      setPatients(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return patients;

    return patients.filter((p) => {
      const name = `${p.firstname || ""} ${p.lastname || ""}`.toLowerCase();
      const pid = (p.patientId || "").toLowerCase();
      const phone = (p.phonenumber || "").toLowerCase();
      const email = (p.email || "").toLowerCase();
      return (
        name.includes(term) ||
        pid.includes(term) ||
        phone.includes(term) ||
        email.includes(term)
      );
    });
  }, [patients, q]);

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-full">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                Registered Patients
              </h1>
              <p className="text-gray-600 mt-1">
                View all patients registered in the system (read-only).
              </p>
            </div>

            <button
              onClick={fetchPatients}
              className="rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Search card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, patient ID, phone number, email..."
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Loading/Error */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-gray-600 shadow-sm">
              Loading patients...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
              {error}
            </div>
          )}

          {/* Table card */}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Patient List
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Total: <span className="font-semibold">{filtered.length}</span>
                </p>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Patient ID
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Gender
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Age
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Registered
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-10 text-center text-gray-600"
                      >
                        No patients found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr
                        key={p._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">{p.patientId || "-"}</td>
                        <td className="px-6 py-4">
                          {p.firstname || ""} {p.lastname || ""}
                        </td>
                        <td className="px-6 py-4">{p.gender || "-"}</td>
                        <td className="px-6 py-4">{getAge(p.dob)}</td>
                        <td className="px-6 py-4">{p.phonenumber || "-"}</td>
                        <td className="px-6 py-4">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString("en-GB")
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/admin/patients/${p._id}`)}
                            className="rounded-lg bg-gray-900 text-white px-3 py-2 font-semibold hover:bg-black transition"
                          >
                            View more
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
