import React from "react";

interface FundDetailsSectionProps {
  heading?: string;
  highlightText?: string;
  description?: string[];
  imageUrl?: string;
}

const FundDetailsSection: React.FC<FundDetailsSectionProps> = ({
  heading,
  highlightText,
  description,
  imageUrl,
}) => {
  const renderHeading = () => {
    if (!heading) return null;

    if (highlightText && heading.includes(highlightText)) {
      const parts = heading.split(new RegExp(`(${highlightText})`, "g"));
      return parts.map((part, index) =>
        part === highlightText ? (
          <span key={index} className="text-primary-900">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    }

    return heading;
  };

  const renderDescription = () => {
    if (!description || description.length === 0) return null;

    return description.map((para, index) => (
      <p key={index} className="bodyText text-neutral-mid">
        {para}
      </p>
    ));
  };

  return (
    <>
      <section className="bg-white px-4 py-8 md:px-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col md:flex-row gap-6 md:gap-16">
        <div className="w-full md:w-1/4 hidden lg:block">
          <img src={imageUrl} alt="" />
        </div>
        <div className="w-full lg:w-3/4 flex flex-col gap-4 md:gap-10 justify-center">
          <h4 className="subtitleText text-neutral-mid">{renderHeading()}</h4>
          {renderDescription()}
        </div>
      </section>
    </>
  );
};

export default FundDetailsSection;
