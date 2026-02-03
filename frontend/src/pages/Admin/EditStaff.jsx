import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

export default function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    department: "",
    phone: "",
  });

  const [staffId, setStaffId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:3000/users/staffs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to fetch staff");

      const s = data.staff;

      setStaffId(s.staffId || "");

      setForm({
        firstname: s.firstname || "",
        lastname: s.lastname || "",
        dob: s.dob ? String(s.dob).slice(0, 10) : "", // yyyy-mm-dd
        gender: s.gender || "",
        department: s.department || "",
        phone: s.phone || "",
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [id]);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");

      const res = await fetch(`http://localhost:3000/users/staffs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to update staff");

      // back to list
      navigate("/admin/staffs");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-full">
        <div className="p-6 md:p-10 max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Edit Staff
              </h1>
              <p className="text-gray-600 mt-1">
                Update staff profile details {staffId ? `• ${staffId}` : ""}
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/staffs")}
              className="rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
            >
              Back
            </button>
          </div>

          {loading && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600 shadow-sm">
              Loading staff...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 mb-4">
              {error}
            </div>
          )}

          {!loading && (
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    name="firstname"
                    value={form.firstname}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                               focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    name="lastname"
                    value={form.lastname}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                               focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                               focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                               focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    name="department"
                    value={form.department}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                               focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                               focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/staffs")}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
