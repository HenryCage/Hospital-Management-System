import React from "react";

export default function MissionSection() {
  return (
    <section id="mission" className="py-16 sm:py-24">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="text-primary text-base font-bold tracking-wide uppercase">
          Our Mission
        </h2>

        <p className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">
          Empowering Healthcare Providers
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Our mission is to empower healthcare providers by streamlining the
          complexities of blood management. We are dedicated to enhancing patient
          safety and improving outcomes by providing a reliable, intuitive, and
          efficient system for tracking and managing blood supplies from donor to
          recipient.
        </p>
      </div>
    </section>
  );
}
