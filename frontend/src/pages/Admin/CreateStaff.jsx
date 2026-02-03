import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    phone: "",
    department: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          dob: form.dob,
          gender: form.gender,
          phone: form.phone,
          department: form.department,
          role: form.role,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Signup successful");
      console.log(data);
    } catch (error) {
      console.log("Error in signup: " + error);
      alert("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">
              Create Staff Account
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Register a new staff member
            </p>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="font-bold text-slate-900 mb-4">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      First name
                    </label>
                    <input
                      name="firstname"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Last name
                    </label>
                    <input
                      name="lastname"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Date of birth
                    </label>
                    <input
                      name="dob"
                      type="date"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Gender
                    </label>
                    <select
                      name="gender"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Phone
                    </label>
                    <input
                      name="phone"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Work */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="font-bold text-slate-900 mb-4">
                  Work Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Department
                    </label>
                    <input
                      name="department"
                      placeholder="e.g. Pharmacy"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Role
                    </label>
                    <select
                      name="role"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="pharmacist">Pharmacist</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Credentials */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="font-bold text-slate-900 mb-4">
                  Login Credentials
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="name@hospital.com"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Create password"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Confirm password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Buttons (UX unchanged) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/admin/dashboard")}
                  className="h-12 rounded-xl border border-slate-300 bg-white px-5 font-bold text-slate-900 hover:bg-slate-50 transition"
                >
                  Back
                </button>

                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="h-12 rounded-xl bg-blue-600 text-white px-6 font-bold hover:bg-blue-700 transition"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>

            <p className="text-xs text-slate-500 mt-5">
              Tip: Use strong passwords. Ensure role + department are correct.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
