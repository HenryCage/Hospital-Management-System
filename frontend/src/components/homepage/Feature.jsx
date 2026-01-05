import React from "react";

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-10 px-4 py-10">
      {/* Heading */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold sm:font-black tracking-[-0.033em] leading-tight max-w-2xl mx-auto">
          A Smarter Way to Manage Blood Supply
        </h1>

        <p className="text-base leading-normal max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          VitaFlow provides the critical tools your facility needs to maintain an
          optimal blood inventory, reduce waste, and ensure compliance.
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
            <h2 className="text-lg font-bold leading-tight">Real-Time Inventory</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor your entire blood supply with live updates, automated alerts
              for low stock, and expiration tracking.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
          <div className="text-primary">
            <span className="material-symbols-outlined !text-4xl">group</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-tight">Seamless Donor Tracking</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage donor information, history, and communication efficiently to
              ensure a steady and safe supply.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
          <div className="text-primary">
            <span className="material-symbols-outlined !text-4xl">pie_chart</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold leading-tight">Advanced Analytics</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gain data-driven insights into usage patterns, demand forecasting,
              and operational performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
