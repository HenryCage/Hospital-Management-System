import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PrescriptionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/pharmacy/prescriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPrescription(data.prescription);
        setItems(
          data.items.map(i => ({
            ...i,
            dispenseQty: i.quantity
          }))
        );
        setLoading(false);
      });
  }, [id]);

  const handleChange = (index, value) => {
    const copy = [...items];
    copy[index].dispenseQty = value;
    setItems(copy);
  };

  const handleDispense = async () => {
    const drugs = items.map(i => ({
      drugId: i.drug._id,
      quantity: Number(i.dispenseQty),
      note: ""
    }));

    await fetch(`http://localhost:3000/pharmacy/dispense/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ drugs })
    });

    alert("Dispensed successfully");
    navigate("/pharmacy/prescriptions");
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
        <button
          onClick={() => navigate("/pharmacy/dashboard")}
          className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-5 rounded shadow mb-6">
        <p><b>Patient:</b> {prescription.patient.firstname} {prescription.patient.lastname}</p>
        <p><b>Doctor:</b> {prescription.doctor.name}</p>
        <p><b>Date:</b> {new Date(prescription.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold">Prescribed Drugs</h3>
          <p className="text-sm text-gray-500">Review and dispense medication</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="px-6 py-3 text-left">Drug</th>
                <th className="px-6 py-3 text-left">Dosage</th>
                <th className="px-6 py-3 text-left">Frequency</th>
                <th className="px-6 py-3 text-left">Duration</th>
                <th className="px-6 py-3 text-center">Prescribed</th>
                <th className="px-6 py-3 text-center">Dispense</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{item.drug}</td>

                  <td className="px-6 py-4">{item.dosage}</td>

                  <td className="px-6 py-4">{item.frequency}</td>

                  <td className="px-6 py-4">{item.duration}</td>

                  <td className="px-6 py-4 text-center font-semibold text-gray-700">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      min="1"
                      max={item.quantity}
                      value={item.dispenseQty}
                      onChange={(e) =>
                        handleQtyChange(i, Number(e.target.value))
                      }
                      className="w-20 text-center border rounded-lg px-2 py-1.5
                                focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            ← Back
          </button>

          <button
            onClick={handleDispense}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition"
          >
            Dispense Drugs
          </button>
        </div>
      </div>

    </div>
  );
}
