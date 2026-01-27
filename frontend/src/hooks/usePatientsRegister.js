import { useEffect, useState } from "react";

const isSameDay = (a, b) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export default function usePatientsRegisteredToday() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToday = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/patient/getpatients", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch patients");

      const patients = data.patients || [];
      const today = new Date();

      const todays = patients.filter((p) => {
        const d = new Date(p.createdAt);
        return !Number.isNaN(d.getTime()) && isSameDay(d, today);
      });

      setCount(todays.length);
    } catch (err) {
      setError(err.message);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
    const t = setInterval(fetchToday, 15000);
    return () => clearInterval(t);
  }, []);

  return { count, loading, error, refetch: fetchToday };
}
