import StatCard from "./Card"

export default function Stats () {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Today's Appts" value="12" icon="event_available" />
      <StatCard label="Doctors on Duty" value="8" icon="stethoscope" />
      <StatCard label="Pending Labs" value="4" icon="pending_actions" />
      <StatCard label="Available Beds" value="15" icon="bed" />
    </section>
  )
}