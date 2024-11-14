import React from "react";

interface FundStewardSectionProps {
  name: string;
  designation: string;
  imageSrc: string;
  paragraphs: string[];
}

const FundStewardSection: React.FC<FundStewardSectionProps> = ({
  name,
  designation,
  imageSrc,
  paragraphs,
}) => {
  return (
    <section className="bg-white px-4 py-8 md:p-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16">
      <h4 className="subtitleText text-neutral-mid">
        The stewards of the fund
      </h4>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-12 bg-off-white rounded-2xl border-2 border-solid border-gray-300 p-8 md:p-12">
        <div className="flex flex-col justify-center gap-8 md:gap-12 items-center w-full lg:w-1/3">
          <img src={imageSrc} alt={name} className="w-60 h-60" />
          <div className="flex flex-col gap-1">
            <h5 className="switzer-sb text-lg md:text-2xl primaryText text-center">
              {name}
            </h5>
            <p className="bodyText text-neutral-light text-center">
              {designation}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col gap-1 md:gap-4 justify-center">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="bodyText text-neutral-mid">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundStewardSection;
