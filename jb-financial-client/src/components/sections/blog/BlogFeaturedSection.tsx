import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../../Constants"; // Adjust the import path as needed

interface BlogContent {
  heading: string;
  paragraphs: string[];
  imageUrl?: string;
}

interface Blog {
  _id: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  content: BlogContent[];
}

const BlogFeaturedSection: React.FC = () => {
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedBlog = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First, get the featured blog ID
        const featuredResponse = await fetch(`${SERVER_URL}/api/feature-blog`);

        if (!featuredResponse.ok) {
          throw new Error("Failed to fetch featured blog ID");
        }

        const featuredData = await featuredResponse.json();

        if (
          !featuredData.success ||
          !featuredData.data ||
          !featuredData.data.blogId
        ) {
          throw new Error("No featured blog set");
        }

        const featuredBlogId = featuredData.data.blogId;

        // Then, fetch the blog details using the ID
        const blogResponse = await fetch(
          `${SERVER_URL}/api/blogs/${featuredBlogId}`
        );

        if (!blogResponse.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const blogData = await blogResponse.json();
        setFeaturedBlog(blogData);
      } catch (err) {
        console.error("Error fetching featured blog:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load featured blog"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBlog();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex justify-center items-center">
        <p className="bodyText">Loading featured blog...</p>
      </section>
    );
  }

  if (error || !featuredBlog) {
    return (
      <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex justify-center items-center">
        <p className="bodyText text-red-500">
          {error || "No featured blog available"}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16">
      <div className="w-full md:w-1/4">
        <img
          src={featuredBlog.imageUrl}
          alt={featuredBlog.title}
          className="w-full md:w-auto"
        />
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-4 md:gap-10 justify-center">
        <div className="flex gap-4 items-center">
          <span className="regularText uppercase">{featuredBlog.category}</span>
          <div className="flex gap-2 border border-neutral-mid rounded-full px-3 py-1">
            <img src="/icons/clock.svg" alt="Clock" />
            <span className="switzer-md text-sm">{featuredBlog.duration}</span>
          </div>
        </div>
        <h4 className="subtitleText text-neutral-mid">{featuredBlog.title}</h4>
        <p className="bodyText text-neutral-mid">{featuredBlog.description}</p>
        <a
          href={`/blogs/${featuredBlog._id}`}
          className="secondary-button inline-block"
        >
          Read More
        </a>
      </div>
    </section>
  );
};

export default BlogFeaturedSection;
