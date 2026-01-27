import { useEffect, useState } from "react";

export default function useVisitCount(status) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCount = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/visit/count?status=${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch visit count");

      setCount(data.count || 0);
    } catch (err) {
      setError(err.message);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
    const t = setInterval(fetchCount, 15000); // auto refresh every 15s
    return () => clearInterval(t);
  }, [status]);

  return { count, loading, error, refetch: fetchCount };
}
