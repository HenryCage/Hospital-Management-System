import { useNavigate } from "react-router-dom"

export default function HeroSection () {
  const navigate = useNavigate()
  return (
    <section className="bg-white dark:bg-[#1a2634] rounded-xl border p-8 flex gap-6 items-center">
      {/* <div className="w-1/3 aspect-video rounded-lg bg-gray-200" /> */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">New Patient Registration</h2>
        <p className="text-[#617589] max-w-xl">
          Start the intake process for a new arrival. This will open the standard admission form and automatically assign a temporary ID.
        </p>
        <button className="bg-primary text-white px-6 h-12 rounded-lg font-bold flex items-center gap-2 w-fit" onClick={() => navigate('/rcp/register')}>
          <span className="material-symbols-outlined">add_circle</span>
          Register New Patient
        </button>
      </div>
    </section>
  )
}