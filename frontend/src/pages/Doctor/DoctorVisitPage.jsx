import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorSidebar from "../../components/doctor/Sidebar";

const getAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "";
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
};

const formatDateTime = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DoctorVisitPage() {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    labTests: "",
    prescriptions: "",
    diagnosis: "",
  });

  const token = localStorage.getItem("token");

  const fetchVisit = async () => {
    const res = await fetch(`http://localhost:3000/visit/${visitId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let data = null;
    try {
      data = await res.json();
    } catch (e) {}

    if (!res.ok) throw new Error(data?.message || "Failed to fetch visit");

    return data.visit;
  };

  const fetchVitals = async () => {
    const res = await fetch(`http://localhost:3000/vitals/${visitId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    let data = null;
    try {
      data = await res.json();
    } catch (e) {}

    if (!res.ok) throw new Error(data?.message || "Failed to fetch vitals");
    return data.vitals || [];
  };

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const [visitData, vitalsData] = await Promise.all([
        fetchVisit(),
        fetchVitals(),
      ]);

      setVisit(visitData);
      setVitals(vitalsData);

      setForm({
        labTests: visitData.labTests || "",
        prescriptions: visitData.prescriptions || "",
        diagnosis: visitData.diagnosis || "",
      });
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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) return <p className="p-8">Loading visit...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!visit) return <p className="p-8">Visit not found</p>;

  const isReadOnly = Boolean(visit.closedAt);
  const p = visit.patient;

  const saveNotes = async () => {
    if (isReadOnly) return;

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`http://localhost:3000/visit/${visitId}/doctor`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {}

      if (!res.ok) throw new Error(data?.message || "Failed to save notes");

      setVisit(data.visit);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (status) => {
    if (isReadOnly) return;

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`http://localhost:3000/visit/${visitId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {}

      if (!res.ok) throw new Error(data?.message || "Failed to update status");

      setVisit(data.visit);
      navigate("/doctor/pending");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const notesHistory = Array.isArray(visit.notesHistory) ? visit.notesHistory : [];
  const notesHistoryNewestFirst = [...notesHistory].sort(
    (a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Consultation</h2>
          <p className="text-gray-600">
            {p?.firstname} {p?.lastname} • {p?.patientId} • {p?.gender} • Age:{" "}
            {getAge(p?.dob) || "-"} • Status: <b>{visit.status}</b>
          </p>

          {visit.doctorUpdatedAt && (
            <p className="text-sm text-gray-500 mt-1">
              Last saved: {formatDateTime(visit.doctorUpdatedAt)}
            </p>
          )}

          {isReadOnly && (
            <p className="text-sm text-gray-600 bg-gray-100 inline-block px-3 py-2 rounded mt-3">
              This visit is closed and read-only.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <p className="text-gray-500">
                      {new Date(v.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3">Doctor Notes</h3>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">
                  Lab Tests (optional)
                </label>
                <textarea
                  name="labTests"
                  value={form.labTests}
                  onChange={onChange}
                  disabled={isReadOnly}
                  className={`w-full border rounded p-2 mt-1 min-h-[90px] ${
                    isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="e.g. Full blood count, malaria test..."
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Drugs / Prescription
                </label>
                <textarea
                  name="prescriptions"
                  value={form.prescriptions}
                  onChange={onChange}
                  disabled={isReadOnly}
                  className={`w-full border rounded p-2 mt-1 min-h-[90px] ${
                    isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="e.g. Paracetamol 500mg - 1 tab 3x daily..."
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Diagnosis / Observation
                </label>
                <textarea
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={onChange}
                  disabled={isReadOnly}
                  className={`w-full border rounded p-2 mt-1 min-h-[120px] ${
                    isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="Write diagnosis and observations..."
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {isReadOnly ? null : (
                  <>
                    <button
                      onClick={saveNotes}
                      disabled={saving}
                      className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save Notes"}
                    </button>

                    <button
                      onClick={() => updateStatus("admitted")}
                      disabled={saving}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-60"
                    >
                      Admit
                    </button>

                    <button
                      onClick={() => updateStatus("completed")}
                      disabled={saving}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
                    >
                      Conclude
                    </button>
                  </>
                )}
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-2">Previous Saved Notes</h4>

                {notesHistoryNewestFirst.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    No previous saved notes yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {notesHistoryNewestFirst.map((n, idx) => (
                      <details
                        key={`${n.savedAt || idx}-${idx}`}
                        className="border rounded p-3"
                      >
                        <summary className="cursor-pointer text-sm font-semibold">
                          Saved: {formatDateTime(n.savedAt) || "Unknown time"}
                        </summary>

                        <div className="text-sm mt-3 space-y-2">
                          <div>
                            <p className="text-gray-500 font-semibold">
                              Lab Tests
                            </p>
                            <p className="whitespace-pre-wrap">
                              {n.labTests?.trim() ? n.labTests : "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 font-semibold">
                              Prescriptions
                            </p>
                            <p className="whitespace-pre-wrap">
                              {n.prescriptions?.trim() ? n.prescriptions : "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 font-semibold">
                              Diagnosis
                            </p>
                            <p className="whitespace-pre-wrap">
                              {n.diagnosis?.trim() ? n.diagnosis : "-"}
                            </p>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
