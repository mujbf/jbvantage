import React, { useState } from "react";
import jbfLogo from "/logo.svg";

const JBFNavbarNew: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white w-screen shadow-md fixed z-10 top-0">
      <div className=" px-4 md:px-8 lg:px-20 xl:px-40">
        <div className="flex justify-between items-center h-16">
          {/* Left-aligned Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold">
              <img src={jbfLogo} alt="" />
            </a>
          </div>

          {/* Center-aligned nav menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            <a href="/our-funds" className="text-gray-700 hover:text-gray-900">
              Funds
            </a>

            <a
              href="/private-wealth-management"
              className="text-gray-700 hover:text-gray-900"
            >
              Private Wealth Management
            </a>
            <a
              href="/private-asset-management"
              className="text-gray-700 hover:text-gray-900"
            >
              Private Asset Management
            </a>
            <a
              href="/institutional-wealth-management"
              className="text-gray-700 hover:text-gray-900"
            >
              Institutional Wealth Management
            </a>
          </div>

          {/* Right-aligned buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign In
            </button>
            <button className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
              Sign Up
            </button>
          </div>

          {/* Hamburger Menu for mobile */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              aria-label="toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a
              href="#home"
              className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              Home
            </a>
            <a
              href="#services"
              className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              Services
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              Contact
            </a>
            <div className="mt-4">
              <button className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Sign In
              </button>
              <button className="block w-full mt-2 bg-transparent border border-blue-500 text-blue-500 py-2 rounded hover:bg-blue-100">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default JBFNavbarNew;
