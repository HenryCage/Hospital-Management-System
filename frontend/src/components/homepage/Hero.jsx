import React from "react";

export default function HeroSection() {
  return (
    <section>
      <div className="p-4 sm:p-6">
        <div
          className="flex min-h-[480px] flex-col gap-6 sm:gap-8 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10 sm:px-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCS4eBXFNDGulqcq3EUXEcPUbKO7dGqhsHDe1OFsfOz0MU3Ei3a6fHshZrJ0DVt2BNTLInMq_yK_9qmjtyY9lcHACPuRYOUpjwwB_vKxPZT0FjgAMD2nmWTMonpV3x33QUtm38P10Qlt0DsGp4rpNiYylH9BCjlOe0StCNT0bPJk_V2tJfGWNfs7oE1EtTuSMR2y7w4Mer9fWnoR0NUx6-hs1Qkgvx737PHjyb6rCa5OHXIKmcaaUG6dXcrLq3DZ8Dv7WzVZRwKUY8")',
          }}
        >
          <div className="flex flex-col gap-2 max-w-3xl text-left">
            <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
              Revolutionizing Blood Supply Management for Modern Healthcare
            </h1>

            <h2 className="text-white/90 text-sm sm:text-base font-normal leading-normal">
              Our intelligent platform ensures the right blood type is available
              at the right time, saving lives through efficiency, accuracy, and
              real-time data.
            </h2>
          </div>

          <button className="flex items-center justify-center h-10 sm:h-12 px-4 sm:px-5 rounded-lg bg-primary text-white text-sm sm:text-base font-bold hover:opacity-90 transition-opacity">
            <span className="truncate">Request a Demo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
