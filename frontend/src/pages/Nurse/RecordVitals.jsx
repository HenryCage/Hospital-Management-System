import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NurseSidebar from "../../components/nurse/Sidebar";

export default function NurseRecordVitals() {
  const { visitId } = useParams();

  const [visit, setVisit] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    height: "",
    weight: "",
    systolic: "",
    diastolic: "",
    temperature: "",
    pulseRate: "",
  });

  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const [visitRes, vitalsRes] = await Promise.all([
        fetch(`http://localhost:3000/visit/${visitId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
        fetch(`http://localhost:3000/vitals/${visitId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
      ]);

      const visitData = await visitRes.json();
      const vitalsData = await vitalsRes.json();

      if (!visitRes.ok) throw new Error(visitData?.message || "Failed to load visit");
      if (!vitalsRes.ok) throw new Error(vitalsData?.message || "Failed to load vitals");

      setVisit(visitData.visit);
      setVitals(vitalsData.vitals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [visitId]);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`http://localhost:3000/vitals/${visitId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to save vitals");

      setForm({
        height: "",
        weight: "",
        systolic: "",
        diastolic: "",
        temperature: "",
        pulseRate: "",
      });

      await load();
      alert("Vitals saved ✅");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      <NurseSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Record Vitals</h2>

        {visit?.patient && (
          <p className="text-gray-600 mb-6">
            {visit.patient.firstname} {visit.patient.lastname} • {visit.patient.patientId} • Status:{" "}
            <b>{visit.status}</b>
          </p>
        )}

        {error && (
          <p className="bg-white p-4 rounded shadow text-red-600 mb-4">
            {error}
          </p>
        )}

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">New Vitals</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.keys(form).map((k) => (
              <input
                key={k}
                name={k}
                value={form[k]}
                onChange={onChange}
                placeholder={k}
                className="border rounded p-2"
              />
            ))}
          </div>

          <button
            onClick={submit}
            disabled={saving}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Vitals"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Vitals History</h3>

          {vitals.length === 0 ? (
            <p className="text-sm text-gray-600">No vitals recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {vitals.map((v) => (
                <div key={v._id} className="border rounded p-3 text-sm">
                  <p>
                    BP: {v.systolic ?? "-"} / {v.diastolic ?? "-"} • Temp:{" "}
                    {v.temperature ?? "-"} • Pulse: {v.pulseRate ?? "-"}
                  </p>
                  <p>
                    Weight: {v.weight ?? "-"} • Height: {v.height ?? "-"}
                  </p>
                  <p className="text-gray-500">{new Date(v.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
