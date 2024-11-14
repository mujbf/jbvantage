import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Fund {
  category: string;
  description: string;
  equityPercentage: number;
  moneyMarketPercentage: number;
  imageUrl: string;
}

interface FundAccordionProps {
  funds: Fund[];
}

const FundAccordion: React.FC<FundAccordionProps> = ({ funds }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const groupedFunds = funds.reduce((acc, fund) => {
    if (!acc[fund.category]) {
      acc[fund.category] = [];
    }
    acc[fund.category].push(fund);
    return acc;
  }, {} as { [key: string]: Fund[] });

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion flex flex-col gap-4">
      {Object.keys(groupedFunds).map((category, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-title cursor-pointer switzer-sb text-neutral-light text-base md:text-2xl flex justify-between items-center p-6 ${
              activeIndex === index
                ? "border-primary-900 border-2 rounded-xl text-primary-900"
                : "border-y-2 border-neutral-lightest"
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {category}
            <span
              className={`${
                activeIndex === index ? "text-primary-900" : "text-neutral-mid"
              }`}
            >
              {activeIndex === index ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {activeIndex === index && (
            <div className="accordion-content p-6">
              {groupedFunds[category].map((fund, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-12 justify-between border-b-2 border-neutral-lightest pb-4 md:pb-6"
                >
                  <div className="flex-grow flex flex-col gap-12 w-full md:w-[60%]">
                    <p className="bodyText neutralText">{fund.description}</p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col flex-grow gap-0 md:gap-6">
                        <h4 className="switzer-sb text-base md:text-xl lg:text-2xl text-neutral-dark uppercase">
                          Equity Markets
                        </h4>
                        <p className="zodiak-r text-2xl md:text-[64px] text-primary-900">
                          {fund.equityPercentage}%
                        </p>
                      </div>
                      <div className="flex flex-col flex-grow gap-0 md:gap-6">
                        <h4 className="switzer-sb text-base md:text-xl lg:text-2xl text-neutral-dark uppercase">
                          Money and Debt Market
                        </h4>
                        <p className="zodiak-r text-2xl md:text-[64px] text-primary-900">
                          {fund.moneyMarketPercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-none items-center justify-center w-full md:w-[40%]">
                    <img
                      src={fund.imageUrl}
                      className="rounded-xl md:rounded-2xl"
                      alt={`image-${i}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FundAccordion;
