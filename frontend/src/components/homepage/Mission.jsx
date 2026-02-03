import React from "react";

export default function MissionSection() {
  return (
    <section id="mission" className="py-16 sm:py-24">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="text-primary text-base font-bold tracking-wide uppercase">
          Our Mission
        </h2>

        <p className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">
          Empowering Hospitals to Deliver Better Care
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Our mission is to simplify hospital operations by bringing patient records, staff management, consultations, and pharmacy workflows into one secure platform. We help healthcare providers reduce paperwork, improve efficiency, and deliver faster, safer, and more organized care for every patient.
        </p>
      </div>
    </section>
  );
}
