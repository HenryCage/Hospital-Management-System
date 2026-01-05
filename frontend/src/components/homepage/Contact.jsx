import React from "react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-white dark:bg-background-dark rounded-xl px-6 sm:px-12 my-10 border border-gray-200 dark:border-gray-700"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
        {/* Text Content */}
        <div className="flex flex-col">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">
            Schedule a Consultation
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Ready to see how VitaFlow can transform your facility's blood
            management? Fill out the form, and our team will get in touch to
            schedule a personalized demo.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 dark:text-gray-200 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Facility */}
          <div>
            <label
              htmlFor="facility"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Healthcare Facility
            </label>
            <div className="mt-2">
              <input
                id="facility"
                name="facility"
                type="text"
                placeholder="City General Hospital"
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 dark:text-gray-200 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane.doe@hospital.com"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 dark:text-gray-200 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Message
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="I'd like to learn more about..."
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 dark:text-gray-200 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center h-12 px-5 rounded-lg bg-primary text-white text-base font-bold tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">Submit Request</span>
          </button>
        </form>
      </div>
    </section>
  );
}
