import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 sm:px-10 py-3 w-full max-w-6xl">
        {/* Logo + Brand */}
        <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
          <div className="size-6 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_nav)">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_nav">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <h2 className="text-xl font-bold tracking-[-0.015em]">VitaFlow</h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            <a
              href="#mission"
              className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
            >
              Our Mission
            </a>
            <a
              href="#services"
              className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </nav>

          <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity" type="button" onClick={() => navigate("/onboarding")}>
            <span className="truncate">Get Started</span>
          </button>
        </div>
      </div>
    </header>
  );
}
