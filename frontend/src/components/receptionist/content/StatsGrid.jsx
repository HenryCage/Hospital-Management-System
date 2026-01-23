import StatCard from "./Card"
import CountPatients from "../../../hooks/CountPatients"

export default function Stats () {
  const { count } = CountPatients();
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Number of Registered Patients" value={count} icon="event_available" />
      <StatCard label="Doctors on Duty" value="8" icon="stethoscope" />
      <StatCard label="Pending Labs" value="4" icon="pending_actions" />
      <StatCard label="Available Beds" value="15" icon="bed" />
    </section>
  )
}