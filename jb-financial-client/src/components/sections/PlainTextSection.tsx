import React from "react";

interface PlainTextSectionProps {
  subtitle?: string;
  body?: string | string[];
  bodyWidth?: "full" | "80%" | "60%";
  textAlign?: "left" | "center" | "right";
  bgColor?: string;
}

const PlainTextSection: React.FC<PlainTextSectionProps> = ({
  subtitle,
  body,
  bodyWidth = "80%",
  textAlign = "center",
  bgColor = "bg-white",
}) => {
  const widthClass =
    bodyWidth === "full"
      ? "w-full"
      : bodyWidth === "60%"
        ? "w-full lg:w-[60%]"
        : "w-full lg:w-[80%]";

  const alignClass =
    textAlign === "left"
      ? "text-left"
      : textAlign === "right"
        ? "text-right"
        : "text-center";

  const itemsClass =
    textAlign === "left"
      ? "items-start"
      : textAlign === "right"
        ? "items-end"
        : "items-center";

  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <section
      className={`${bgColor} px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 lg:gap-16 ${itemsClass}`}
    >
      {subtitle && (
        <h4 className={`subtitleText text-neutral-mid ${alignClass}`}>
          {subtitle}
        </h4>
      )}
      {paragraphs.length > 0 && (
        <div className={`flex flex-col gap-4 ${widthClass}`}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`bodyText text-neutral-mid ${alignClass}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default PlainTextSection;
