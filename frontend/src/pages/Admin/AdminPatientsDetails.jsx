import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
// import AdminSidebar from "../../components/admin/Sidebar";

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 font-medium text-gray-900 break-words">{value ?? "-"}</p>
  </div>
);

export default function AdminPatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatient = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:3000/patient/getpatient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to fetch patient");

      setPatient(data?.patient || data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* <AdminSidebar /> */}

        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                Patient Details
              </h1>
              <p className="text-gray-600 mt-1">
                Registration information (read-only)
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/patients")}
              className="rounded-lg bg-gray-900 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
            >
              Back
            </button>
          </div>

          {loading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-gray-600 shadow-sm">
              Loading...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
              {error}
            </div>
          )}

          {!loading && !error && patient && (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Patient Overview
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {patient.firstname || ""} {patient.lastname || ""} •{" "}
                  {patient.patientId || "-"}
                </p>
              </div>

              <Section title="Personal Information">
                <Field label="Patient ID" value={patient.patientId} />
                <Field label="First name" value={patient.firstname} />
                <Field label="Middle name" value={patient.middlename} />
                <Field label="Last name" value={patient.lastname} />
                <Field label="Gender" value={patient.gender} />
                <Field
                  label="Date of birth"
                  value={
                    patient.dob
                      ? new Date(patient.dob).toLocaleDateString("en-GB")
                      : "-"
                  }
                />
              </Section>

              <Section title="Contact Information">
                <Field label="Phone number" value={patient.phonenumber} />
                <Field label="Email" value={patient.email} />
                <Field label="Address" value={patient.address} />
              </Section>

              <Section title="Emergency Contact">
                <Field label="Name" value={patient.emergencycontact} />
                <Field
                  label="Email"
                  value={patient.emergencycontactemail}
                />
                <Field
                  label="Phone number"
                  value={patient.emergencycontactnumber}
                />
                <Field
                  label="Relationship"
                  value={patient.emergencycontactrelationship}
                />
              </Section>

              <Section title="Medical Information">
                <Field label="Blood group" value={patient.bloodgroup} />
                <Field label="Genotype" value={patient.genotype} />
                <Field label="Weight (kg)" value={patient.weight} />
                <Field label="Height (cm)" value={patient.height} />
                <Field label="Allergies" value={patient.allergies} />
                <Field
                  label="Medical history"
                  value={patient.medicalhistory}
                />
              </Section>

              <Section title="Registration Info">
                <Field
                  label="Registered on"
                  value={
                    patient.createdAt
                      ? new Date(patient.createdAt).toLocaleString("en-GB")
                      : "-"
                  }
                />
              </Section>
            </>
          )}
        </main>
      </div>
    </div>
    </AdminLayout>
  );
}
