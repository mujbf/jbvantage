import React from "react";

interface TextSectionProps {
  groups: Array<{ title: string; description: string }>;
  mainTitle?: string;
  mainDescription?: string;
}

const TextSection: React.FC<TextSectionProps> = ({
  groups,
  mainTitle,
  mainDescription,
}) => {
  return (
    <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col lg:flex-row gap-16">
      <div className="flex flex-col justify-start gap-12 w-full lg:w-[60%]">
        <h2 className="subtitleText text-neutral-mid">{mainTitle}</h2>
        <p className="bodyText neutralText w-full lg:w-[80%]">
          {mainDescription}
        </p>
      </div>
      <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:gap-16">
        {groups.map((group, index) => (
          <div key={index}>
            {group.title && (
              <h2 className="switzer-sb text-base lg:text-2xl text-primary-900 uppercase mb-2">
                {group.title}
              </h2>
            )}
            {group.description && (
              <p className="bodyText neutralText">{group.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TextSection;
