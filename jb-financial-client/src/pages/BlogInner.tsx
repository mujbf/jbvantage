import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogFeaturedSection from "../components/sections/blog/BlogFeaturedSection";
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-[72px]"></div>

      <BlogFeaturedSection
        imageSrc={blog.imageUrl}
        category={blog.category}
        readingTime={blog.duration}
        title={blog.title}
        description={blog.description}
        buttonText=""
      />
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
