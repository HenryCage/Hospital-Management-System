import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PendingPrescriptions() {
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold mb-6">Pending Prescriptions</h2>

        <button
          onClick={() => navigate("/pharmacy/dashboard")}
          className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
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
          <p className="p-6 text-gray-600 text-center">No pending prescriptions</p>
        )}
      </div>
    </div>
  );
}
