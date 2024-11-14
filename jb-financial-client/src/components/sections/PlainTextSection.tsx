import React from "react";

interface PlainTextSectionProps {}

const PlainTextSection: React.FC<PlainTextSectionProps> = ({}) => {
  return (
    <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 lg:gap-16 items-center">
      <h4 className="subtitleText text-neutral-mid text-center">
        Be part of an award winning and fast growing investment management team
      </h4>
      <p className="bodyText text-neutral-mid text-center w-full lg:w-[80%]">
        Since 2013, we've been at the forefront of the investment management
        industry in Sri Lanka. Among us are economists, experienced portfolio
        managers, and seasoned equity advisors who are among the most respected
        in Sri Lanka.
      </p>
    </section>
  );
};

export default PlainTextSection;
