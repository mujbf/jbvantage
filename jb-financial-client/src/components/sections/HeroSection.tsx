import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface HeroSectionProps {
  title: string;
  highlightedText: string;
  description: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
  desktopImage: string;
  mobileImage: string;
  tabletImage: string;
  renderLeftContent?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  highlightedText,
  description,
  button1Text,
  button1Link,
  button2Text,
  button2Link,
  desktopImage,
  mobileImage,
  tabletImage,
  renderLeftContent = true,
}) => {
  const titleWords = title.split(" ");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    event.preventDefault(); // Prevent default anchor behavior

    if (link.startsWith("#")) {
      // Handle in-page scrolling
      const targetId = link.substring(1); // Remove the '#' to get the ID
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Handle normal navigation using React Router
      navigate(link);
    }
  };

  return (
    <section className="w-screen h-[calc(100dvh)] relative z-0">
      <div>
        {renderLeftContent ? (
          <div className="absolute inset-0 flex flex-col lg:justify-center px-4 md:px-8 lg:px-20 2xl:px-40 gap-4 md:gap-8 lg:gap-12 mt-24">
            <h1 className="titleText text-gray-600 lg:w-[55%] fade-in-up">
              {titleWords.map((word, index) =>
                highlightedText.includes(word) ? (
                  <span key={index} className="primaryText">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h1>
            <p className="bodyText neutralText lg:w-[40%]">{description}</p>
            <div className="flex flex-col lg:flex-row gap-4">
              {button1Text && button1Link && (
                <a
                  href={button1Link}
                  onClick={(e) => handleLinkClick(e, button1Link)} // Use handleLinkClick
                  rel="noopener noreferrer"
                >
                  <button className="primary-button">{button1Text}</button>
                </a>
              )}
              {button2Text && button2Link && (
                <a
                  href={button2Link}
                  onClick={(e) => handleLinkClick(e, button2Link)} // Use handleLinkClick
                  rel="noopener noreferrer"
                >
                  <button className="secondary-button">{button2Text}</button>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col lg:justify-center lg:ml-[40%] px-4 md:px-8 lg:px-20 2xl:px-40 gap-4 lg:gap-12 mt-24">
            <h1 className="titleText text-gray-600 fade-in-up">
              {titleWords.map((word, index) =>
                highlightedText.includes(word) ? (
                  <span key={index} className="primaryText">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h1>
            <p className="bodyText neutralText">{description}</p>
            <div className="flex flex-col lg:flex-row gap-4">
              {button1Text && button1Link && (
                <a
                  href={button1Link}
                  onClick={(e) => handleLinkClick(e, button1Link)} // Use handleLinkClick
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="primary-button">{button1Text}</button>
                </a>
              )}
              {button2Text && button2Link && (
                <a
                  href={button2Link}
                  onClick={(e) => handleLinkClick(e, button2Link)} // Use handleLinkClick
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="secondary-button">{button2Text}</button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop and Laptop Background Image */}
      <div
        className="hidden lg:block absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${desktopImage})` }}
      />

      {/* Tablet Background Image */}
      <div
        className="hidden md:block lg:hidden absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${tabletImage})` }}
      />

      {/* Mobile Background Image */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${mobileImage})` }}
      />
    </section>
  );
};

export default HeroSection;
