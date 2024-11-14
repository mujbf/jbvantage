import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  _id: string; // Ensure _id is a string
  category: string;
  duration: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  _id,
  category,
  duration,
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300">
      <div className="flex flex-col px-4 py-6">
        <div className="flex justify-between items-center">
          <span className="regularText uppercase text-neutral-light">
            {category}
          </span>
          <div className="flex gap-2 border border-neutral-mid rounded-full px-3 py-1">
            <img src="/icons/clock.svg" alt="" />
            <span className="switzer-md text-sm">
              {duration}
              <span>m</span>
            </span>
          </div>
        </div>
        <span className="switzer-sb text-lg md:text-2xl primaryText">
          {title}
        </span>
      </div>
      <img src={imageUrl} className="" alt="card-image" />
      <div className="flex flex-col gap-6 px-4 pt-9 pb-6">
        {/* Description with 3 lines limit and ellipsis */}
        <p className="regularText neutralText line-clamp-3">{description}</p>
        <Link
          to={`/blogs/${_id}`}
          className="switzer-md text-neutral-light hover:text-neutral-mid"
        >
          Read More &nbsp;→
        </Link>
      </div>
    </div>
  );
};

export { BlogCard };
