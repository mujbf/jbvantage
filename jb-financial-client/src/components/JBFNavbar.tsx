import jbfLogo from "/logo.svg";
import React, { useRef, useState } from "react";
import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
}

const wealthManagementItems: NavItem[] = [
  { label: "Private Asset Management", href: "/private-asset-management" },
  {
    label: "Institutional Wealth Management",
    href: "/institutional-wealth-management",
  },
];

const fundItems: NavItem[] = [
  { label: "Value Equity Fund", href: "/funds/value-equity-fund" },
  { label: "Money Market Fund", href: "/funds/money-market-fund" },
  { label: "Short Term Gilt Fund", href: "/funds/short-term-gilt-fund" },
  { label: "Credit Opportunity Fund", href: "/funds/credit-opportunity-fund" },
];

const teamItems: NavItem[] = [{ label: "Careers", href: "/careers" }];

const JBFNavbar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = (dropdown: string) => {
    clearTimeout(closeTimeout.current);
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // 300ms delay, adjust as needed
  };

  // Function to check if the current route matches the given href
  const isActive = (href: string) => location.pathname === href;

  // Also matches nested routes, e.g. /funds/value-equity-fund under /funds
  const isSectionActive = (hrefs: string[]) =>
    hrefs.some(
      (href) =>
        location.pathname === href || location.pathname.startsWith(`${href}/`)
    );

  const linkClass = (active: boolean) =>
    `switzer-md text-base ${
      active
        ? "text-neutral-dark switzer-sb"
        : "text-neutral-mid hover:text-neutral-dark"
    }`;

  // Desktop: parent link with the sub items shown on hover
  const renderDesktopDropdown = (
    id: string,
    label: string,
    href: string,
    items: NavItem[]
  ) => (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={handleMouseLeave}
    >
      <Navbar.Link
        href={href}
        className={`${linkClass(
          isSectionActive([href, ...items.map((item) => item.href)])
        )} lg:mx-1 cursor-pointer`}
      >
        {label}
      </Navbar.Link>

      {openDropdown === id && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg py-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="w-[280px] block px-4 py-2 switzer-md text-base text-neutral-mid hover:text-neutral-dark hover:bg-gray-100"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  // Mobile: parent link followed by its sub items as bulleted links
  const renderMobileGroup = (label: string, href: string, items: NavItem[]) => (
    <div className="block md:hidden">
      <Navbar.Link href={href} className={`${linkClass(isActive(href))} lg:mx-1`}>
        {label}
      </Navbar.Link>
      {items.map((item) => (
        <Navbar.Link
          key={item.href}
          href={item.href}
          className={`${linkClass(isActive(item.href))} lg:mx-1`}
        >
          &bull; {item.label}
        </Navbar.Link>
      ))}
    </div>
  );

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
          className={`${linkClass(isActive("/"))} md:-mr-4 lg:mx-1`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          className={`${linkClass(isActive("/about"))} md:-mr-4 lg:mx-1`}
        >
          About
        </Navbar.Link>

        {renderDesktopDropdown("funds", "Funds", "/funds", fundItems)}
        {renderMobileGroup("Funds", "/funds", fundItems)}

        {renderDesktopDropdown(
          "wealth-management",
          "Wealth Management",
          "/private-wealth-management",
          wealthManagementItems
        )}
        {renderMobileGroup(
          "Wealth Management",
          "/private-wealth-management",
          wealthManagementItems
        )}

        {renderDesktopDropdown("team", "Team", "/team", teamItems)}
        {renderMobileGroup("Team", "/team", teamItems)}

        <Navbar.Link
          href="/herwealth"
          className={`${linkClass(isActive("/herwealth"))} md:-mr-4 lg:mx-1`}
        >
          HerWealth
        </Navbar.Link>
        <Navbar.Link
          href="/contact"
          className={`${linkClass(isActive("/contact"))} lg:mx-1 block md:hidden`}
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
