import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("hospitalName", data.user?.hospital?.name || "");
      localStorage.setItem("hospitalCode", data.user?.hospital?.hospitalId || "");

      console.log("LOGIN RESPONSE:", data);
      console.log("ROLE:", data?.user?.role);

      const role = (data?.user?.role || "").toLowerCase();
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "receptionist":
          navigate("/rcp/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "nurse":
          navigate("/nurse/dashboard");
          break;
        case "pharmacist":
          navigate("/pharmacy/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-zinc-900 to-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
          <div className="px-6 pt-7 pb-5 border-b border-zinc-800">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="rounded-lg border border-red-800/50 bg-red-950 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-300">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@hospital.com"
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-white placeholder:text-zinc-500 shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-white placeholder:text-zinc-500 shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white"
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-lg bg-white text-black py-2.5 font-semibold
                        hover:bg-zinc-200 transition
                        disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="text-center text-xs text-zinc-500 pt-2">
              Secure hospital access
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4">
          © {new Date().getFullYear()} HMS Platform
        </p>
      </div>
    </div>
  );
}
