import { useEffect, useState } from "react";

export default function CountPatients() {
  const [count, setCount] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const res = await fetch('http://localhost:3000/patient/count', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch patient count');
        }

        setCount(data.count)
      } catch (error) {
        setError(error.message)
      } finally {
        // setLoading(false)
      }
    }

    fetchCount();
  }, []);

  return {count, error}
}