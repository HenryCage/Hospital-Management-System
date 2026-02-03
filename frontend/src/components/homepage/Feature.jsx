import React from "react";

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-10 px-4 py-10">
      {/* Heading */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold sm:font-black tracking-[-0.033em] leading-tight max-w-2xl mx-auto">
          A Smarter Way to Run Your Hospital
        </h1>

        <p className="text-base leading-normal max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Your system provides everything hospitals need to manage daily operations efficiently — from patient intake to treatment and discharge.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {/* Feature 1 */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
          <div className="text-primary">
            <span className="material-symbols-outlined !text-4xl">inventory_2</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-tight">Patient Management</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Register patients, track medical history, visits, and vital records in one organized system for easy access and continuity of care.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
          <div className="text-primary">
            <span className="material-symbols-outlined !text-4xl">group</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-tight">Staff & Workflow Coordination</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage doctors, nurses, pharmacists, and departments seamlessly to ensure smooth communication and faster service delivery.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
          <div className="text-primary">
            <span className="material-symbols-outlined !text-4xl">pie_chart</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-tight">Integrated Pharmacy & Records</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send prescriptions directly to the pharmacy, track dispensed medications, and maintain accurate treatment histories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
