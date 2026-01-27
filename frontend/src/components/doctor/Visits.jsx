import { formatDate } from "../../utils/date";

const getAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "";
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
};

export default function VisitsTable({ visits, onOpen, emptyText }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Patient ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
            <th className="p-3">Created</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {visits.map((v) => (
            <tr key={v._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{v.patient?.patientId || "-"}</td>
              <td className="p-3">
                {v.patient?.firstname || ""} {v.patient?.lastname || ""}
              </td>
              <td className="p-3">{v.patient?.gender || "-"}</td>
              <td className="p-3">{getAge(v.patient?.dob) || "-"}</td>
              <td className="p-3">{formatDate(v.createdAt)}</td>
              <td className="p-3">
                <button
                  onClick={() => onOpen(v._id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                >
                  Open
                </button>
              </td>
            </tr>
          ))}

          {visits.length === 0 && (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-600">
                {emptyText || "No visits found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
