import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import DoctorSidebar from "../../components/doctor/Sidebar";
import PatientTable from "../../components/patients/PatientTable";

export default function PatientList() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/patient/getpatients", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch all patients");

      setPatients(data.patients || []);
    } catch (err) {
      console.log("Error in getting All Patients (Doctor Frontend)");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const openHistory = (patientId) => {
    navigate(`/doctor/patients/${patientId}/history`);
  };

  if (loading) return <i><p className="p-8">Loading Patients.........</p></i>;

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Patient List</h2>

        {error && (
          <p className="bg-white p-4 rounded shadow text-red-600 mb-4 text-center">
            {error}
          </p>
        )}

        <PatientTable
          patients={patients}
          primaryActionLabel="Medical History"
          onPrimaryAction={(patient) => openHistory(patient._id)}
          hideSecondaryAction={true}
        />
      </main>
    </div>
  );
}
