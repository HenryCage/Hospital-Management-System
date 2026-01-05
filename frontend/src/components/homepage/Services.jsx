import React from "react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="text-primary text-base font-bold tracking-wide uppercase">
          Services Offered
        </h2>

        <p className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">
          Comprehensive Management Solutions
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Explore our suite of services designed to cover every aspect of the
          blood supply chain, from donor to transfusion, ensuring safety and
          efficiency at every step.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto px-4 sm:px-10">
        {/* Left Column (Boxes) */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Inventory Management
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Real-time tracking of blood units, automated alerts for low stock
              levels, and proactive expiration management to minimize waste and
              prevent shortages.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Donor Coordination
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Streamline donor recruitment and management with integrated
              communication tools, appointment scheduling, and detailed donor
              history logs.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
              Reporting &amp; Analytics
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfu8LLS2u0OOvmIhWMS4aqTTyaaQKzkq-rqDLEKBKft9600iuzslCLlmP1JkR04m5opa3-ImCS3GZWjj5O0LgOJcBA2FDXXZxqyQ3SKbkWwYGZAP9EEjwPs4WH1RCUBSiBG8j-KtKieGf8A8lrvjLcSjkCAcvDgDTwTFbInW83dJlTEf4G_ptGYiQ-6Jh4tRJukNB0WHHi9RGL0hWRngyIdGkcpaBJiFaB0PxcRE5IWjJZ5Li8L4tcPO0KRqXdnQPMmOS8_d4_KSA"
            alt="Scientist working in a modern laboratory, representing healthcare technology"
          />
        </div>
      </div>
    </section>
  );
}
