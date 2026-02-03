import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/pharmacy/Sidebar/sidebar";

export default function PharmacyDashboard() {
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

  const pendingCount = prescriptions.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </aside>

      <main className="ml-64 p-6 md:p-10">
        {/* Page header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Pharmacy Dashboard
            </h2>
            <p className="text-slate-600 mt-1">
              Track pending prescriptions and daily activity.
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <p className="text-sm font-medium text-slate-600">
              Pending Prescriptions
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-4xl font-extrabold text-slate-900">
                {pendingCount}
              </p>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-100">
                Needs action
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <p className="text-sm font-medium text-slate-600">Dispensed Today</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-4xl font-extrabold text-slate-900">0</p>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                Completed
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <p className="text-sm font-medium text-slate-600">Cancelled</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-4xl font-extrabold text-slate-900">0</p>
              <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-100">
                Cancelled
              </span>
            </div>
          </div>
        </div>

        {/* Pending prescriptions table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pending Prescriptions
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {pendingCount === 0
                  ? "No prescriptions waiting."
                  : `Total pending: ${pendingCount}`}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3 text-left font-semibold">Patient</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {prescriptions.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      {p.patient?.firstname} {p.patient?.lastname}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-100">
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/pharmacy/prescriptions/${p._id}`)
                        }
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.99] transition"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {prescriptions.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-slate-700 font-semibold">
                  No pending prescriptions 🎉
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  You’re all caught up for now.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
