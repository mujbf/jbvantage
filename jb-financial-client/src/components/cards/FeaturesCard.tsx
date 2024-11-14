import React from "react";
import { CheckFat, ShieldCheck, Medal } from "@phosphor-icons/react"; // Add any required icons here

interface CardProps {
  subtitle: string;
  description: string;
  icon: React.ElementType; // To handle dynamic icon components
}

const FeaturesCardData: CardProps[] = [
  {
    subtitle: "Simplicity",
    description:
      "Investing in unit trusts has never been easier. JB Vantage’s products are “plain vanilla”, intuitive and give you the tools to make the right portfolio investments for you.",
    icon: CheckFat, // Dynamic icon
  },
  {
    subtitle: "Security",
    description:
      "Our investors have two layers of protection by way of a third party trustee and custodian, Deutsche Bank AG Colombo, and oversight by the SEC of Sri Lanka.",
    icon: ShieldCheck, // Dynamic icon
  },
  {
    subtitle: "Standards",
    description:
      "We employ the most rigorous industry practices including the CFA Asset Manager Code, which is followed by more than 1,100 firms in 30 countries worldwide.",
    icon: Medal, // Dynamic icon
  },
];

const FeaturesCard: React.FC<CardProps> = ({
  subtitle,
  description,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300">
      <div className="w-full pt-6 flex justify-center">
        <Icon size={64} color="#930010" /> {/* Render the dynamic icon here */}
      </div>
      <div className="flex flex-col px-4 py-6">
        <span className="switzer-sb text-lg md:text-2xl primaryText text-center">
          {subtitle}
        </span>
      </div>
      <div className="flex flex-col gap-6 px-4 pb-6">
        <p className="regularText neutralText text-center">{description}</p>
      </div>
    </div>
  );
};

export { FeaturesCard, FeaturesCardData };
