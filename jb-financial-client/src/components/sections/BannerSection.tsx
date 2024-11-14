import React from "react";

interface BannerSectionProps {
  title?: string;
  description?: string;
  buttonText1?: string;
  buttonLink1?: string;
  buttonText2?: string;
  buttonLink2?: string;
  centerAlign?: boolean;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  title,
  description,
  buttonText1,
  buttonLink1,
  buttonText2,
  buttonLink2,
  centerAlign = false,
}) => {
  return (
    <section
      className={`bg-off-white border-y-2 border-neutral-lighter px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 lg:gap-16 ${
        centerAlign ? "items-center text-center" : ""
      }`}
    >
      {title && <h2 className="subtitleText text-gray-600">{title}</h2>}
      {description && <p className="bodyText neutralText">{description}</p>}
      {(buttonText1 || buttonText2) && (
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {buttonText1 && buttonLink1 && (
            <a href={buttonLink1} rel="noopener noreferrer">
              <button className="secondary-button">{buttonText1}</button>
            </a>
          )}
          {buttonText2 && buttonLink2 && (
            <a href={buttonLink2} rel="noopener noreferrer">
              <button className="primary-button">{buttonText2}</button>
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default BannerSection;
