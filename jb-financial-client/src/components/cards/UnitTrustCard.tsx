import React from "react";

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link: string;
}

const unitTrustCardData: CardProps[] = [
  {
    title: "JB Vantage",
    subtitle: "Value Equity Fund",
    description:
      "Invest in equities of publicly listed companies in Sri Lanka and benefit from our rigorous research methodology.",
    imageUrl: "/images/funds/value-equity.jpg",
    link: "/funds/value-equity-fund",
  },
  {
    title: "JB Vantage",
    subtitle: "Money Market Fund",
    description:
      "Experience the higher returns of a fixed deposit, and the withdrawal flexibility of a regular savings account.",
    imageUrl: "/images/funds/money-market.jpg",
    link: "/funds/money-market-fund",
  },
  {
    title: "JB Vantage",
    subtitle: "Short Term Gilt Fund",
    description:
      "Invest in government securities such as treasury bills and bonds which are considered 'Risk-free' investment instruments.",
    imageUrl: "/images/funds/short-term-gilt.jpg",
    link: "/funds/short-term-gilt-fund",
  },
];

const UnitTrustCard: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  link,
}) => {
  return (
    <div className="flex flex-col md:flex-row bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 overflow-hidden">
      {/* Image - Full width on mobile, left side on desktop */}
      <div className="md:w-2/5 flex-shrink-0">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt="card-image"
        />
      </div>

      {/* Content - Right side on desktop, below image on mobile */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col px-4 py-6">
          <span className="regularText">{title}</span>
          <span className="switzer-sb text-lg md:text-2xl primaryText">
            {subtitle}
          </span>
        </div>

        <div className="flex flex-col gap-6 px-4 pt-0 pb-6 md:pt-2 flex-1 justify-between">
          <p className="regularText neutralText">{description}</p>
          <a
            href={link}
            className="switzer-md text-base md:text-lg text-neutral-light hover:text-neutral-mid"
          >
            Learn More &nbsp;→
          </a>
        </div>
      </div>
    </div>
  );
};

export { UnitTrustCard, unitTrustCardData };
