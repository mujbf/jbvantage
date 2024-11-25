import jbfLogo from "/logo.svg";
import React, { useState } from "react";
import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";

const JBFNavbar: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay, adjust as needed
  };

  // Function to check if the current route matches the given href
  const isActive = (href: string) => location.pathname === href;

  return (
    <Navbar
      fluid
      className="w-screen px-4 md:px-8 lg:px-20 2xl:px-40 bg-white fixed z-10 shadow-sm"
    >
      <Navbar.Brand href="/">
        <img src={jbfLogo} className="mr-3 h-6 sm:h-9" alt="JB Financial" />
      </Navbar.Brand>
      <div className="flex md:order-2 items-center gap-4 relative">
        <a
          href="https://www.jbs.lk/ut/"
          target="_blank"
          className="hidden md:block relative group"
        >
          <button className="secondary-button">Login</button>
        </a>

        <a href="/contact" className="hidden lg:block relative group">
          <img src="/icons/phone-contact.svg" alt="Contact Us" />
          <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 hidden group-hover:block p-2 bg-gray-400 text-white text-sm rounded shadow-lg switzer-r text-xs w-fit">
            Contact Us
          </div>
        </a>

        <Navbar.Toggle className="xl:hidden" />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          className={`switzer-md text-base ${
            isActive("/")
              ? "text-neutral-dark switzer-sb"
              : "text-neutral-mid hover:text-neutral-dark"
          } md:-mr-4 lg:mx-1`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          className={`switzer-md text-base ${
            isActive("/about")
              ? "text-neutral-dark switzer-sb"
              : "text-neutral-mid hover:text-neutral-dark"
          } md:-mr-4 lg:mx-1`}
        >
          About
        </Navbar.Link>
        <Navbar.Link
          href="/funds"
          className={`switzer-md text-base ${
            isActive("/funds")
              ? "text-neutral-dark switzer-sb"
              : "text-neutral-mid hover:text-neutral-dark"
          } md:-mr-4 lg:mx-1`}
        >
          Funds
        </Navbar.Link>

        {/* Updated Services Section */}
        <div
          className="relative hidden md:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Navbar.Link
            href="/private-wealth-management"
            className={`switzer-md text-base ${
              [
                "/private-wealth-management",
                "/private-asset-management",
                "/institutional-wealth-management",
              ].includes(location.pathname)
                ? "text-neutral-dark switzer-sb"
                : "text-neutral-mid hover:text-neutral-dark"
            } lg:mx-1 cursor-pointer`}
          >
            Wealth Management
          </Navbar.Link>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg py-2">
              <a
                href="/private-asset-management"
                className="w-[280px] block px-4 py-2 switzer-md text-base text-neutral-mid hover:text-neutral-dark hover:bg-gray-100"
              >
                Private Asset Management
              </a>
              <a
                href="/institutional-wealth-management"
                className="block px-4 py-2 switzer-md text-base text-neutral-mid hover:text-neutral-dark hover:bg-gray-100"
              >
                Institutional Wealth Management
              </a>
            </div>
          )}
        </div>

        {/* Mobile Services Links */}
        <div className="block md:hidden">
          <Navbar.Link
            href="/private-wealth-management"
            className={`switzer-md text-base ${
              isActive("/private-wealth-management")
                ? "text-neutral-dark switzer-sb"
                : "text-neutral-mid hover:text-neutral-dark"
            } lg:mx-1`}
          >
            Wealth Management
          </Navbar.Link>
          <Navbar.Link
            href="/private-asset-management"
            className={`switzer-md text-base ${
              isActive("/private-asset-management")
                ? "text-neutral-dark switzer-sb"
                : "text-neutral-mid hover:text-neutral-dark"
            } lg:mx-1`}
          >
            &bull; Private Asset Management
          </Navbar.Link>
          <Navbar.Link
            href="/institutional-wealth-management"
            className={`switzer-md text-base ${
              isActive("/institutional-wealth-management")
                ? "text-neutral-dark switzer-sb"
                : "text-neutral-mid hover:text-neutral-dark"
            } lg:mx-1`}
          >
            &bull; Institutional Wealth Management
          </Navbar.Link>
        </div>

        <Navbar.Link
          href="/team"
          className={`switzer-md text-base ${
            isActive("/team")
              ? "text-neutral-dark switzer-sb"
              : "text-neutral-mid hover:text-neutral-dark"
          } md:-mr-4 lg:mx-1`}
        >
          Team
        </Navbar.Link>
        <Navbar.Link
          href="/careers"
          className={`switzer-md text-base ${
            isActive("/careers")
              ? "text-neutral-dark switzer-sb"
              : "text-neutral-mid hover:text-neutral-dark"
          } md:-mr-4 lg:mx-1`}
        >
          Careers
        </Navbar.Link>
        <Navbar.Link
          href="/contact"
          className={`switzer-md text-base ${
            isActive("/contact")
              ? "text-neutral-dark switzer-sb"
              : "text-neutral-mid hover:text-neutral-dark"
          } lg:mx-1 block md:hidden`}
        >
          Contact Us
        </Navbar.Link>
        <Navbar.Link
          href="https://jbs.lk/ut"
          target="_blank"
          className="switzer-md text-base text-neutral-mid hover:text-neutral-dark lg:mx-1 block md:hidden"
        >
          Login
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default JBFNavbar;
