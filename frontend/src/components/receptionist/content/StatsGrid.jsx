import StatCard from "./Card";
import useVisitCount from "../../../hooks/useVisitCounts.js";
import usePatientsRegisteredToday from "../../../hooks/usePatientsRegister.js";

export default function Stats() {
  const todayPatients = usePatientsRegisteredToday();
  const pendingVisits = useVisitCount("pending");
  const admittedVisits = useVisitCount("admitted");

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Patients Registered Today"
        value={todayPatients.count}
        icon="person_add"
      />

      <StatCard
        label="Active Visits (Pending)"
        value={pendingVisits.count}
        icon="hourglass_top"
      />

      <StatCard
        label="Admitted Patients"
        value={admittedVisits.count}
        icon="local_hospital"
      />
    </section>
  );
}
