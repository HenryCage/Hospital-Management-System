import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StatusPill = ({ value }) => {
  const v = String(value || "").toLowerCase();

  const map = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    dispensed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const cls = map[v] || "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {value || "-"}
    </span>
  );
};

export default function PendingPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/pharmacy/prescriptions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPrescriptions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Pending Prescriptions
            </h2>
            <p className="text-slate-600 mt-1">
              Review and open prescriptions for dispensing
            </p>
          </div>

          <button
            onClick={() => navigate("/pharmacy/dashboard")}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 font-semibold
                       hover:bg-black transition"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Dashboard
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <p className="text-sm text-slate-600">
              Total pending: <b className="text-slate-900">{prescriptions.length}</b>
            </p>
          </div>

          {prescriptions.length === 0 ? (
            <div className="p-10 text-center text-slate-600">
              No pending prescriptions 🎉
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-3 text-left font-semibold">Patient</th>
                    <th className="px-6 py-3 text-left font-semibold">Doctor</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                    <th className="px-6 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {prescriptions.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {p.patient?.firstname} {p.patient?.lastname}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {p.doctor?.name || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <StatusPill value={p.status} />
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate(`/pharmacy/prescriptions/${p._id}`)}
                          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-2 font-semibold
                                     hover:bg-emerald-700 active:scale-[0.99] transition"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
