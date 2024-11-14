import React from "react";

interface BlogHeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  description,
  tags,
}) => {
  return (
    <>
      <div className="w-full h-[72px]"></div>
      <section className="bg-primary-950 px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16 items-center">
        {title && (
          <h3 className="subtitleText text-white text-center">{title}</h3>
        )}
        {description && (
          <p className="bodyText text-neutral-lighter text-center">
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex gap-2 md:gap-6">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="switzer-sb text-xs md:text-base text-neutral-lightest uppercase px-3 md:px-6 py-2 border border-white rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BlogHeader;
