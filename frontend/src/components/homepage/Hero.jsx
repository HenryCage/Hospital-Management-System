import image from '../../image/img.jpeg'
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="p-4 sm:p-6">
        <div
          className="flex min-h-[480px] flex-col gap-6 sm:gap-8 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10 sm:px-10"
          style={{
            backgroundImage:
              `linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url(${image})`,
          }}
        >
          <div className="flex flex-col gap-2 max-w-3xl text-left">
            <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
              Smart Hospital Management System for Modern Healthcare
            </h1>

            <h2 className="text-white/90 text-sm sm:text-base font-normal leading-normal">
              Manage patients, admissions, blood inventory, and hospital operations in one secure, real-time platform designed for efficiency and accuracy.
            </h2>
          </div>

          
        </div>
      </div>
    </section>
  );
}
