import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date";
import Sidebar from "../../components/receptionist/sidebar/sidebar";

export default function PatientManagement() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:3000/patient/getpatients', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        if (!res.ok) {
          throw new Error('Failed to fetch all patients');
        }

        const data = await res.json()
        setPatients(data.patients || [])
        setLoading(false);

      } catch (error) {
        console.log('Error in getting All Patients (Frontend)');
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }

    fetchPatients()
  }, [])

  if (loading) return <i><p className="p-8">Loading Patients.........</p></i>

  const getAge = (dob) => {
    if (!dob) return '';

    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return '';

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age
  }

  const startVisit = async (patientId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/visit/start/${patientId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error (data.message || 'Failed to start visit');

      alert(data.resumed ? "Resumed open visit ✅" : "New visit started ✅");
      navigate(`/rcp/visits/${data.visit._id}`);

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="p-8">
      <Sidebar />

      <h2 className="text-2xl font-bold mb-6 text-center">
        Patient List
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 text-center font-semibold">Patient Id</th>
              <th className="p-3 text-center font-semibold">Patient Name</th>
              <th className="p-3 text-center font-semibold">Gender</th>
              <th className="p-3 text-center font-semibold">Age</th>
              <th className="p-3 text-center font-semibold">Phone</th>
              <th className="p-3 text-center font-semibold">Registered</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-center align-middle">{patient.patientId}</td>
                <td className="p-3 text-center align-middle">{patient.firstname} {patient.lastname}</td>
                <td className="p-3 text-center align-middle">{patient.gender}</td>
                <td className="p-3 text-center align-middle">{getAge(patient.dob)}</td>
                <td className="p-3 text-center align-middle">{patient.phonenumber}</td>
                <td className="p-3 text-center align-middle">{formatDate(patient.createdAt)}</td>
                
                <td className="p-3 text-center align-middle">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => startVisit(patient._id)} className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded">
                    Start Visit
                  </button>
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td colSpan="7" className="p-3 text-center">
                  No Patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}