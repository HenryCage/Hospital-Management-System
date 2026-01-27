import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const getAge = (dob) => {
  if (!dob) return '';

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return '';

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age
}

export default function VisitPage () {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState(null)
  const [vitals, setVitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    height: '',
    weight: '',
    systolic: '',
    diastolic: '',
    temperature: '',
    pulseRate: ''
  });

  const token = localStorage.getItem('token')

  const fetchVisit = async () => {
    const res =  await fetch(`http://localhost:3000/visit/${visitId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch Visit')
    return data.visit
  };

  const fetchVitals = async () => {
    const res = await fetch(`http://localhost:3000/vitals/${visitId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Failed to fetch Vitals')
    return data.vitals || []
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const [visitData, vitalsData] = await Promise.all([
          fetchVisit(),
          fetchVitals()
        ])

        setVisit(visitData)
        setVitals(vitalsData)
      } catch {
        console.log('Error setting visit and vitals');
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [visitId])

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const saveVitals = async (e) => {
    e.preventDefault();
    try {
      setSaving(true)
      setError(null)

      const res = await fetch(`http://localhost:3000/vitals/${visitId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          height: form.height,
          weight: form.weight,
          systolic: form.systolic,
          diastolic: form.diastolic,
          temperature: form.temperature,
          pulseRate: form.pulseRate
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to Save Vitals(Frontend)')
      
      const vitalsData = await fetchVitals();
      setVitals(vitalsData)
    } catch (err) {
      console.log('Error in saving Vitals (zFront2');
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="p-8">Loading visit...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!visit) return <p className="p-8">Visit not found</p>;

  const patient = visit.patient;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Patient Visit Record</h2>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="font-semibold">
          {patient?.firstname} {patient?.lastname} <span className="text-gray-500">
            ({patient?.patientId})
          </span>
        </p>

        <p className="text-sm text-gray-700">
          Gender: {patient?.gender || "-"} • Age: {getAge(patient?.dob) || "-"} • Status: {visit.status}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold mb-3">Enter Vitals</h3>

        <form onSubmit={saveVitals} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            name="height"
            value={form.height}
            onChange={onChange}
            placeholder="Height in CM"
            className="border rounded p-2"
          />
          <input
            name="weight"
            value={form.weight}
            onChange={onChange}
            placeholder="Weight in KG"
            className="border rounded p-2"
          />

          <input
            name="systolic"
            value={form.systolic}
            onChange={onChange}
            placeholder="Systolic BP Reading"
            className="border rounded p-2"
          />

          <input
            name="diastolic"
            value={form.diastolic}
            onChange={onChange}
            placeholder="Diastolic BP Reading"
            className="border rounded p-2"
          />

          <input
            name="temperature"
            value={form.temperature}
            onChange={onChange}
            placeholder="Temperature in C"
            className="border rounded p-2"
          />

          <input
            name="pulseRate"
            value={form.pulseRate}
            onChange={onChange}
            placeholder="Pulse"
            className="border rounded p-2"
          />

          <div className="md:col-span-3">
            <button
              onClick={() => navigate('/rcp/dashboard')}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              {saving ? 'Saving...': 'Save'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Vitals History</h3>

        {vitals.length === 0 ? (
          <p className="text-sm text-gray-600">No vitals recorded yet.</p>
        ): (
          <div className="space-y-2">
            {vitals.map((v) => (
              <div key={v._id} className="border rounded p-3 text-sm">
                <p>
                  BP: {v.systolic ?? "-"} / {v.diastolic ?? "-"} • Temp: {v.temperature ?? "-"}°C • Pulse: {v.pulseRate ?? "-"}
                </p>
                <p>
                  Weight: {v.weight ?? "-"}KG • Height: {v.height ?? "-"}CM
                </p>
                <p className="text-gray-500">
                  {new Date(v.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}