import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/pharmacy/Sidebar/sidebar";

export default function PharmacyDashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/pharmacy/prescriptions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setPrescriptions);
  }, []);

  const pendingCount = prescriptions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </aside>

      <main className="ml-64 p-8">
        <h2 className="text-2xl font-bold mb-6">Pharmacy Dashboard</h2>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Pending Prescriptions</p>
            <p className="text-3xl font-bold">{pendingCount}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Dispensed Today</p>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Cancelled</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Pending prescriptions table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">
                    {p.patient?.firstname} {p.patient?.lastname}
                  </td>
                  <td className="p-3">{p.doctor?.name}</td>
                  <td className="p-3">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/pharmacy/prescriptions/${p._id}`)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {prescriptions.length === 0 && (
            <p className="p-6 text-center text-gray-600">
              No pending prescriptions 🎉
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
