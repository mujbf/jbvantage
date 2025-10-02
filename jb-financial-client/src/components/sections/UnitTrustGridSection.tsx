import React from "react";

// Updated UnitTrustCard with side-by-side layout
interface UnitTrustCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  buttonText?: string;
}

const UnitTrustCard: React.FC<UnitTrustCardProps> = ({
  image,
  title,
  description,
  link,
  buttonText = "Learn More",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Section */}
        <div className="sm:w-1/3 h-48 sm:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Content Section */}
        <div className="sm:w-2/3 p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h3 className="switzer-sb text-lg md:text-2xl primaryText">
              {title}
            </h3>
            <p className="regularText neutralText">{description}</p>
          </div>

          <a href={link} className="inline-block">
            <button className="secondary-button w-full sm:w-auto">
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

// Sample data for unit trust cards
export const unitTrustGridData = [
  {
    image: "/images/funds/value-equity.jpg",
    title: "JB Vantage Value Equity Fund",
    description:
      "A diversified equity fund focusing on undervalued stocks with strong growth potential and long-term capital appreciation.",
    link: "/funds/value-equity-fund",
    buttonText: "View Fund",
  },
  {
    image: "/images/funds/money-market.jpg",
    title: "JB Vantage Money Market Fund",
    description:
      "Low-risk investment option providing stable returns through short-term government securities and high-grade corporate bonds.",
    link: "/funds/money-market-fund",
    buttonText: "View Fund",
  },
  {
    image: "/images/funds/short-term-gilt.jpg",
    title: "JB Vantage Short Term Gilt Fund",
    description:
      "Government securities fund offering moderate risk with steady income through short to medium-term government bonds.",
    link: "/funds/short-term-gilt-fund",
    buttonText: "View Fund",
  },
  {
    image: "/images/funds/value-equity.jpg",
    title: "JB Vantage Balanced Fund",
    description:
      "Strategic mix of equity and fixed income investments designed to balance growth potential with income generation.",
    link: "/funds/balanced-fund",
    buttonText: "View Fund",
  },
];

// Main Grid Section Component
interface UnitTrustGridSectionProps {
  subtitleText: string;
  bodyText?: string;
  buttonText?: string;
  buttonType?: "primary" | "secondary";
  buttonLink?: string;
  alignText?: "left" | "center";
  cardData?: UnitTrustCardProps[];
}

const UnitTrustGridSection: React.FC<UnitTrustGridSectionProps> = ({
  subtitleText,
  bodyText,
  buttonText,
  buttonType = "secondary",
  buttonLink,
  alignText = "center",
  cardData = unitTrustGridData,
}) => {
  const applyPrimaryTextClass = (text: string) => {
    const words = text.split(" ");
    return (
      <>
        {words.map((word, index) =>
          word.includes("*") ? (
            <span key={index} className="primaryText">
              {word.replace("*", "")}
            </span>
          ) : (
            <span key={index}>{word} </span>
          )
        )}
      </>
    );
  };

  return (
    <section
      className={`bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-6 md:gap-8 lg:gap-16 items-${alignText}`}
    >
      {/* Header Section */}
      <div
        className={`text-${alignText} max-w-4xl ${
          alignText === "center" ? "mx-auto" : ""
        }`}
      >
        <h2 className={`subtitleText text-neutral-mid text-${alignText} mb-4`}>
          {applyPrimaryTextClass(subtitleText)}
        </h2>
        {bodyText && <p className={`bodyText text-${alignText}`}>{bodyText}</p>}
      </div>

      {/* 2x2 Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 w-full mx-auto">
        {cardData.slice(0, 4).map((card, index) => (
          <UnitTrustCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
            buttonText={card.buttonText}
          />
        ))}
      </div>

      {/* Optional Bottom Button */}
      {buttonText && buttonLink && (
        <div className={`w-full text-${alignText}`}>
          <a
            href={buttonLink}
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className={`${buttonType}-button`}>{buttonText}</button>
          </a>
        </div>
      )}
    </section>
  );
};

export default UnitTrustGridSection;
