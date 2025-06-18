import { useState } from "react";
import {
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import footerData from "./footerData.json"; // Import the JSON data

// Define the type for hover state
type IconType = "meta" | "instagram" | "x" | null;

// Define the type for social links and sections
type SocialLink = {
  platform: IconType;
  url: string;
  icon: "MetaLogo" | "InstagramLogo" | "XLogo";
};

type SectionLink = {
  text: string;
  url: string;
};

type Section = {
  title: string;
  links: SectionLink[];
};

type FooterData = {
  companyInfo: {
    logoSrc: string;
    description: string;
  };
  socialLinks: SocialLink[];
  sections: Section[];
};

const JBFFooter: React.FC = () => {
  const data: FooterData = footerData as FooterData; // Typecast the JSON data

  // State for hover effect
  const [hoveredIcon, setHoveredIcon] = useState<IconType>(null);

  // Common icon size and default color
  const iconSize = 32;
  const defaultColor = "#AAAAAA";
  const hoverColor = "#444444"; // Change this to your desired hover color

  // Function to render icons dynamically based on platform
  const renderIcon = (iconName: string, platform: IconType) => {
    switch (iconName) {
      case "MetaLogo":
        return (
          <FacebookLogo
            size={iconSize}
            color={hoveredIcon === platform ? hoverColor : defaultColor}
            className="transition-colors duration-300"
          />
        );
      case "InstagramLogo":
        return (
          <InstagramLogo
            size={iconSize}
            color={hoveredIcon === platform ? hoverColor : defaultColor}
            className="transition-colors duration-300"
          />
        );
      case "XLogo":
        return (
          <LinkedinLogo
            size={iconSize}
            color={hoveredIcon === platform ? hoverColor : defaultColor}
            className="transition-colors duration-300"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-neutral-lightest px-4 pt-8 md:px-8 lg:px-20 lg:pt-20 2xl:px-40 2xl:pt-20 flex flex-col">
      <div className=" flex flex-col lg:flex-row gap-6 lg:gap-16">
        {/* Company Info Section */}
        <div className="flex flex-col w-full lg:w-1/3 items-start gap-4 lg:gap-8">
          <img
            src={data.companyInfo.logoSrc}
            className="mr-3 h-6 sm:h-9"
            alt="JB Financial"
          />

          <p className="regularText text-neutral-mid">
            {data.companyInfo.description}
          </p>
          <div className="flex space-x-4">
            {/* Dynamic Social Links */}
            {data.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIcon(link.platform)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {renderIcon(link.icon, link.platform)}
              </a>
            ))}
          </div>
        </div>
        {/* Dynamic Sections */}
        {data.sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col w-full lg:w-1/5 gap-4"
          >
            <h1 className="switzer-sb text-base lg:text-xl uppercase text-neutral-dark lg:mb-4">
              {section.title}
            </h1>
            {section.links.map((link) => (
              <a
                key={link.text}
                href={link.url}
                className="regularText text-neutral-mid hover:text-neutral-dark"
              >
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>
      {/* Additional Section for Privacy Policy, Terms and Conditions, and Copyright */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-8 border-t border-neutral-light py-4">
        {/* Left aligned links */}
        <div className="flex space-x-4 mb-4 lg:mb-0">
          <a
            href="/privacy-policy"
            className="regularText text-neutral-mid hover:text-neutral-dark"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="regularText text-neutral-mid hover:text-neutral-dark"
          >
            Terms and Conditions+{" "}
          </a>
          <a
            href="/common-terminology"
            className="regularText text-neutral-mid hover:text-neutral-dark"
          >
            Common Terminology
          </a>
        </div>

        {/* Right aligned copyright text */}
        <p className="regularText text-neutral-mid text-center lg:text-right">
          © {new Date().getFullYear()} JB Financial. All rights reserved. Site
          by <a href="https://www.magicunbound.co/">Magic Unbound</a>
        </p>
      </div>
    </div>
  );
};

export default JBFFooter;
