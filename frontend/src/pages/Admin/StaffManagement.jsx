import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

export default function StaffManagement() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/users/staffs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => null);
        console.log(staff[0])
        console.log("STAFF RESPONSE:", data);
        console.log("FIRST STAFF:", data?.staffs);

        if (!res.ok) throw new Error(data?.message || "Failed to fetch staffs");

        setStaff(data.staffs || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return staff;

    return staff.filter((s) => {
      const name = `${s.firstname || ""} ${s.lastname || ""}`.toLowerCase();
      const email = (s.email || "").toLowerCase();
      const phone = (s.phone || "").toLowerCase();
      const dept = (s.department || "").toLowerCase();

      return (
        name.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        dept.includes(term)
      );
    });
  }, [staff, q]);

  const deleteStaff = async (id) => {
  const ok = window.confirm("Are you sure you want to delete this staff?");
  if (!ok) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/users/staffs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || "Failed to delete staff");

    // ✅ update UI immediately
    setStaff((prev) => prev.filter((s) => s._id !== id));
  } catch (e) {
    alert(e.message);
  }
};


  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-full">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Staff Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all registered hospital staff
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/create-staff")}
              className="rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
            >
              Register Staff
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <label className="text-sm font-medium text-gray-700">
              Search staff
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, phone, department..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Loading/Error */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600 shadow-sm">
              Loading staff...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
              {error}
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Staff List
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Total: <span className="font-semibold">{filtered.length}</span>
                </p>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-center font-semibold text-gray-700">Staff ID</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Department
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-gray-600"
                      >
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr
                        key={s._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">
                          {s.staffId || "-"}
                        </td>

                        <td className="px-6 py-4">
                          {s.firstname} {s.lastname}
                        </td>
                        <td className="px-6 py-4">{s.phone}</td>
                        <td className="px-6 py-4">{s.department}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button 
                          onClick={() => navigate(`/admin/staffs/${s._id}/edit`)}
                          className="rounded-lg bg-gray-900 text-white px-3 py-2 font-semibold hover:bg-black transition">
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteStaff(s._id)}
                            className="rounded-lg bg-red-600 text-white px-3 py-2 font-semibold hover:bg-red-700 transition">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
