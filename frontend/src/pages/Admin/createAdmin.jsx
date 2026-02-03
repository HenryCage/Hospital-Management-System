import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AdminSignup() {
  const navigate = useNavigate();
  const { hospitalId } = useParams(); // ✅ get hospitalId from route

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, hospitalId }), // ✅ attach hospitalId
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || "Admin setup failed");
        return;
      }

      alert("Admin created successfully. Please login.");
      navigate("/login");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">Admin Setup</h1>
        <p className="text-sm text-gray-600 mb-6">
          Create the system administrator account
        </p>

        {!hospitalId && (
          <p className="text-amber-700 bg-amber-50 border border-amber-200 text-sm p-3 rounded mb-4">
            Missing hospital ID. Please start onboarding from the hospital setup page.
          </p>
        )}

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            disabled={loading || !hospitalId}
            className="bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Creating admin..." : "Create Admin"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an admin?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
