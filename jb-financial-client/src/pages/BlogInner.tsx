import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../Constants";

interface BlogContent {
  heading: string;
  paragraphs: string[];
  imageUrl?: string;
}

interface Blog {
  _id: { $oid: string };
  category: string;
  duration: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  content: BlogContent[];
}

const BlogInner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${SERVER_URL}/api/blogs/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <div className="h-[72px]"></div>
        <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex justify-center items-center">
          <p className="bodyText">Loading blog...</p>
        </section>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <div className="h-[72px]"></div>
        <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex justify-center items-center">
          <p className="bodyText text-red-500">{error || "Blog not found"}</p>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="h-[72px]"></div>

      {/* Blog Header Section - Same design as BlogFeaturedSection */}
      <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16">
        <div className="w-full md:w-1/4">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full md:w-auto"
          />
        </div>
        <div className="w-full md:w-3/4 flex flex-col gap-4 md:gap-10 justify-center">
          <div className="flex gap-4 items-center">
            <span className="regularText uppercase">{blog.category}</span>
            <div className="flex gap-2 border border-neutral-mid rounded-full px-3 py-1">
              <img src="/icons/clock.svg" alt="Clock" />
              <span className="switzer-md text-sm">{blog.duration}</span>
            </div>
          </div>
          <h4 className="subtitleText text-neutral-mid">{blog.title}</h4>
          <p className="bodyText text-neutral-mid">{blog.description}</p>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-6 md:gap-8 lg:gap-16 items-center">
        {blog.content.map((section, index) => (
          <div key={index} className="mb-8 flex flex-col gap-0 md:gap-4 w-full">
            <h3 className="zodiak-r text-2xl md:text-5xl text-neutral-mid mb-4">
              {section.heading}
            </h3>
            {section.imageUrl && (
              <img
                src={section.imageUrl}
                alt={section.heading}
                className="w-full h-auto mb-4 rounded-lg"
              />
            )}
            {section.paragraphs.map((paragraph, paraIndex) => (
              <p key={paraIndex} className="bodyText text-neutral-mid mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};

export default BlogInner;
