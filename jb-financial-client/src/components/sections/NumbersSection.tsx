import React from "react";

interface NumbersSectionProps {
  groups: Array<{ title: string; description: string }>;
  mainTitle?: string;
  mainDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const NumbersSection: React.FC<NumbersSectionProps> = ({
  groups,
  mainTitle,
  mainDescription,
  primaryButtonText,
  secondaryButtonText,
}) => {
  return (
    <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:gap-16">
        {groups.map((group, index) => (
          <div key={index}>
            {group.title && (
              <h2 className="subtitleText text-primary-900">{group.title}</h2>
            )}
            {group.description && (
              <p className="text-base lg:text-2xl text-neutral-dark switzer-md w-[80%]">
                {group.description}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-4 lg:gap-12 w-full lg:w-[60%]">
        {mainTitle && (
          <h2 className="subtitleText text-neutral-mid">{mainTitle}</h2>
        )}
        {mainDescription && (
          <p className="bodyText neutralText w-[80%]">{mainDescription}</p>
        )}
        <div className="flex gap-4">
          {primaryButtonText && (
            <button className="primary-button">{primaryButtonText}</button>
          )}
          {secondaryButtonText && (
            <button className="secondary-button">{secondaryButtonText}</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
