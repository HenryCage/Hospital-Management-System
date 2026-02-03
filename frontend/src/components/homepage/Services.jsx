
export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="text-primary text-base font-bold tracking-wide uppercase">
          Services Offered
        </h2>

        <p className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">
          Comprehensive Hospital Management Solutions
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Explore our complete suite of tools designed to support every aspect of hospital operations — from patient registration to treatment, pharmacy, admissions, and reporting — all in one integrated platform.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto px-4 sm:px-10">
        {/* Left Column (Boxes) */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Patient & Visit Management
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Easily register patients, track consultations, admissions, medical history, and treatment progress with a structured and secure digital system.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Pharmacy & Prescriptions
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Send prescriptions directly from doctors to pharmacists, manage dispensed drugs, and maintain clear medication records for every patient.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Reports & Hospital Records
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Leverage powerful data analytics to forecast demand, optimize
              inventory levels, and generate comprehensive reports for
              regulatory compliance and operational improvement.
            </p>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="sticky top-24">
          <img
            className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
            src="https://plus.unsplash.com/premium_photo-1681842883882-b5c1c9f37869?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Scientist working in a modern laboratory, representing healthcare technology"
          />
        </div>
      </div>
    </section>
  );
}
