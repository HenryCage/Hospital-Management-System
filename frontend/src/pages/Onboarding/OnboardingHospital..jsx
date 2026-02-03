import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalOnboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [hospitalId, setHospitalId] = useState(null); // ✅ store saved hospital _id

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const saveHospital = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ prevent re-saving if already saved
    if (hospitalId) return;

    try {
      setSaving(true);

      // ✅ replace with YOUR exact endpoint
      const res = await fetch("http://localhost:3000/onboarding/hospital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save hospital");
      }

      // ✅ support {hospital} or direct hospital response
      const id = data?.hospital?._id || data?._id;

      if (!id) throw new Error("Hospital saved but no ID returned from server");

      setHospitalId(id); // ✅ now it's saved
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const goCreateAdmin = () => {
    if (!hospitalId) return;
    navigate(`/onboarding/admin/${hospitalId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={saveHospital}
        className="w-full max-w-xl bg-white rounded-xl border p-6 space-y-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Setup</h1>
          <p className="text-gray-600 mt-1">
            Save hospital details first, then create the admin account.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Hospital Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
              disabled={!!hospitalId} // ✅ lock fields after saved (optional)
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
              disabled={!!hospitalId}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
              disabled={!!hospitalId}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email (optional)</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              disabled={!!hospitalId}
            />
          </div>
        </div>

        {/* ✅ Buttons */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || !!hospitalId}
            className="w-full rounded-lg bg-gray-900 text-white py-3 font-semibold hover:bg-black disabled:opacity-60"
          >
            {hospitalId ? "Saved ✅" : saving ? "Saving..." : "Save Hospital"}
          </button>

          <button
            type="button"
            onClick={goCreateAdmin}
            disabled={!hospitalId}
            className="w-full rounded-lg bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 disabled:opacity-60"
          >
            Create Admin
          </button>
        </div>

        {hospitalId && (
          <p className="text-sm text-gray-600 pt-2">
            Hospital saved. You can now create the admin account.
          </p>
        )}
      </form>
    </div>
  );
}
