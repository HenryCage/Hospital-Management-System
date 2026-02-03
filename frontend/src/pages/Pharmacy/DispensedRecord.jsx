import { useEffect, useMemo, useState } from "react";
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

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return records;

    return records.filter((r) => {
      const p = r?.prescription?.patient;
      const name = `${p?.firstname || ""} ${p?.lastname || ""}`.toLowerCase();
      const pid = (p?.patientId || "").toLowerCase();
      const doc = (
        r?.prescription?.doctor?.username ||
        r?.prescription?.doctor?.name ||
        ""
      ).toLowerCase();

      return name.includes(qq) || pid.includes(qq) || doc.includes(qq);
    });
  }, [records, q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-screen w-64">
        <PharmacySidebar />
      </aside>

      <main className="ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Dispensed Records
            </h2>
            <p className="text-gray-600 mt-1">
              Track all dispensed prescriptions and quickly search records.
            </p>
          </div>

          <button
            onClick={() => navigate("/pharmacy/dashboard")}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 mb-6">
          <label className="text-sm font-semibold text-gray-700">
            Search (patient name / ID / doctor)
          </label>

          <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
            <span className="material-symbols-outlined text-gray-500 text-[20px]">
              search
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full outline-none text-gray-900 placeholder:text-gray-400"
              placeholder="Type a name, patient ID, or doctor..."
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="text-gray-500 hover:text-gray-900 transition"
                title="Clear"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing{" "}
              <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
              record(s)
            </p>
            <p className="hidden md:block">
              Tip: try searching by <b>PAT-</b> ID 👀
            </p>
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-gray-600">
            Loading records...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Records</h3>

              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                Updated just now
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 font-semibold text-gray-700">Patient</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Patient ID</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Pharmacist</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Dispensed Date</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((r) => {
                    const p = r?.prescription?.patient;

                    return (
                      <tr
                        key={r._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            {p?.firstname} {p?.lastname}
                          </div>
                          <div className="text-xs text-gray-500">
                            {r?.prescription?._id ? `Rx: ${String(r.prescription._id).slice(-6)}` : ""}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold">
                            {p?.patientId || "-"}
                          </span>
                        </td>

                        <td className="px-6 py-4">{displayName(r?.pharmacist)}</td>

                        <td className="px-6 py-4 text-gray-700">
                          {new Date(r.timeDispensed || r.createdAt).toLocaleString()}
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold border border-emerald-200">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                            {r.status || "dispensed"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-10 text-center">
                <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="material-symbols-outlined text-emerald-700">
                    inventory_2
                  </span>
                </div>
                <p className="text-gray-900 font-semibold">No dispensed records found</p>
                <p className="text-gray-600 text-sm mt-1">
                  Try a different search term or check again later.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
