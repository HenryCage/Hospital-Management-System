import { formatDate } from "../../utils/date";

const getAge = (dob) => {
  if (!dob) return "";

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "";

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export default function PatientTable({
  patients,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  hideSecondaryAction = false,
}) {
  return (
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
              <td className="p-3 text-center align-middle">
                {patient.patientId}
              </td>
              <td className="p-3 text-center align-middle">
                {patient.firstname} {patient.lastname}
              </td>
              <td className="p-3 text-center align-middle">
                {patient.gender}
              </td>
              <td className="p-3 text-center align-middle">
                {getAge(patient.dob)}
              </td>
              <td className="p-3 text-center align-middle">
                {patient.phonenumber}
              </td>
              <td className="p-3 text-center align-middle">
                {formatDate(patient.createdAt)}
              </td>

              <td className="p-3 text-center align-middle">
                {!hideSecondaryAction && (
                  <button
                    onClick={() => onSecondaryAction?.(patient)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                    type="button"
                  >
                    {secondaryActionLabel || "Edit"}
                  </button>
                )}

                <button
                  onClick={() => onPrimaryAction(patient)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                  type="button"
                >
                  {primaryActionLabel}
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
  );
}
