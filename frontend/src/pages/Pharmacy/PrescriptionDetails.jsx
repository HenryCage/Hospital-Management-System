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

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3">Dosage</th>
              <th className="p-3">Frequency</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Prescribed Qty</th>
              <th className="p-3">Dispense Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, idx) => (
              <tr key={i._id} className="border-t">
                <td className="p-3">{i.drug.name}</td>
                <td className="p-3">{i.dosage}</td>
                <td className="p-3">{i.frequency}</td>
                <td className="p-3">{i.duration}</td>
                <td className="p-3">{i.quantity}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    value={i.dispenseQty}
                    onChange={e => handleChange(idx, e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={handleDispense}
          className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
        >
          Dispense Drugs
        </button>
      </div>
    </div>
  );
}
