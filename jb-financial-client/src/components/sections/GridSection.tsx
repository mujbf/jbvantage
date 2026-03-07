import React, { useEffect, useState } from "react";
import { UnitTrustCard, unitTrustCardData } from "../cards/UnitTrustCard";
import { FundPriceCard } from "../cards/FundPriceCard";
import { SERVER_URL } from "../../Constants";
import axios from "axios";

interface GridSectionProps {
  subtitleText: string;
  bodyText?: string;
  buttonText?: string;
  buttonType?: "primary" | "secondary";
  buttonLink?: string;
  cardType: "unitTrust" | "fundPrice";
  alignText?: "left" | "center";
}

const GridSection: React.FC<GridSectionProps> = ({
  subtitleText,
  bodyText,
  buttonText,
  buttonType = "secondary",
  buttonLink,
  cardType,
  alignText = "center",
}) => {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (cardType === "fundPrice") {
        try {
          const [
            valueEquityResponse,
            moneyMarketResponse,
            shortTermGiltResponse,
            creditOpportunityResponse,
          ] = await Promise.all([
            axios.get(`${SERVER_URL}/funds/Value Equity Fund`),
            axios.get(`${SERVER_URL}/funds/Money Market Fund`),
            axios.get(`${SERVER_URL}/funds/Short Term Gilt Fund`),
            axios.get(`${SERVER_URL}/funds/Credit Opportunity Fund`),
          ]);

          const fundData = [
            mapFundData(valueEquityResponse.data, "Value Equity Fund"),
            mapFundData(moneyMarketResponse.data, "Money Market Fund"),
            mapFundData(shortTermGiltResponse.data, "Short Term Gilt Fund"),
            mapFundData(
              creditOpportunityResponse.data,
              "Credit Opportunity Fund",
            ),
          ];

          setCards(fundData);
        } catch (error) {
          console.error("Error fetching fund data:", error);
          setCards([]);
        }
      } else if (cardType === "unitTrust") {
        const updatedUnitTrustData = [
          ...unitTrustCardData,
          {
            title: "JB Vantage",
            subtitle: "Credit Opportunity Fund",
            description:
              "Invest in a diversified portfolio of corporate debt instruments and benefit from attractive fixed-income returns.",
            imageUrl: "/images/funds/credit-opportunity.jpeg",
            link: "/funds/credit-opportunity-fund",
          },
        ];
        setCards(updatedUnitTrustData);
      }
    };

    fetchData();
  }, [cardType]);

  const mapFundData = (data: any[], fundType: string) => {
    const sortedData = data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const latestData = sortedData[0];

    const fundLinks: Record<string, string> = {
      "Value Equity Fund": "/funds/value-equity-fund",
      "Money Market Fund": "/funds/money-market-fund",
      "Short Term Gilt Fund": "/funds/short-term-gilt-fund",
      "Credit Opportunity Fund": "/funds/credit-opportunity-fund",
    };

    return {
      buyPrices: [latestData.buyPrice1, latestData.buyPrice2].filter(Boolean),
      link: fundLinks[fundType] || "/learn-more",
      sellPrice: latestData.sellPrice,
      nav: latestData.nav,
      showSecondBuyPrice: !!latestData.buyPrice2,
      subtitle: fundType,
      title: "JB Vantage",
      _id: latestData._id,
      date: latestData.date,
    };
  };

  const applyPrimaryTextClass = (text: string) => {
    const words = text.split(" ");
    return (
      <>
        {words.map((word, index) =>
          word.includes("*") ? (
            <span key={index} className="primaryText">
              {word.replace(/\*/g, "")}
            </span>
          ) : (
            <span key={index}>{word} </span>
          ),
        )}
      </>
    );
  };

  const CardComponent =
    cardType === "unitTrust" ? UnitTrustCard : FundPriceCard;

  return (
    <section
      className={`bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-6 md:gap-8 lg:gap-16 items-${alignText}`}
    >
      <h2 className={`subtitleText text-neutral-mid text-${alignText}`}>
        {applyPrimaryTextClass(subtitleText)}
      </h2>
      {bodyText && <p className={`bodyText text-${alignText}`}>{bodyText}</p>}

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
        {cards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>

      {buttonText && (
        <a
          href={buttonLink}
          rel="noopener noreferrer"
          className="w-full text-center"
        >
          <button className={`${buttonType}-button text-${alignText}`}>
            {buttonText}
          </button>
        </a>
      )}
    </section>
  );
};

export default GridSection;
