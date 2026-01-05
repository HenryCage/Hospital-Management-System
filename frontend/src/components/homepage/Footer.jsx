import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
            <div className="size-6 text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_footer)">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_footer">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h2 className="text-xl font-bold tracking-[-0.015em]">
              VitaFlow
            </h2>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a
              href="#"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2025 VitaFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
