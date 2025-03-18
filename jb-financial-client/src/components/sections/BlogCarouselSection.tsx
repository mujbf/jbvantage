import React, { useEffect, useState } from "react";
import { BlogCard } from "../cards/BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogCarouselSectionProps {
  subtitleText: string;
  bodyText?: string;
  buttonText?: string;
  buttonType?: "primary" | "secondary";
  buttonLink?: string;
  alignText?: "left" | "center";
  blogCategory?: string;
  maxBlogCards?: number;
}

const SERVER_URL = "http://localhost:5000"; // Update this with the correct server URL

const BlogCarouselSection: React.FC<BlogCarouselSectionProps> = ({
  subtitleText,
  bodyText,
  buttonText,
  buttonType = "secondary",
  buttonLink,
  alignText = "left",
  blogCategory,
  maxBlogCards = 6,
}) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleBlogs, setVisibleBlogs] = useState<any[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        // Fetch the latest blog IDs
        const latestResponse = await fetch(`${SERVER_URL}/api/latest-blogs`);
        const latestData = await latestResponse.json();

        if (
          !latestData.success ||
          !latestData.data ||
          !latestData.data.blogIds
        ) {
          setBlogs([]);
          return;
        }

        const blogIds = latestData.data.blogIds; // Correctly extract the blogIds array

        if (blogIds.length === 0) {
          setBlogs([]);
          return;
        }

        // Fetch the blog details for each ID
        const blogDetailsPromises = blogIds.map((id: string) =>
          fetch(`${SERVER_URL}/api/blogs/${id}`).then((res) => res.json())
        );

        const blogDetails = await Promise.all(blogDetailsPromises);

        // If filtering by category, apply the filter
        const filteredBlogs = blogCategory
          ? blogDetails.filter((blog) => blog.category === blogCategory)
          : blogDetails;

        // Limit results to `maxBlogCards`
        setBlogs(filteredBlogs.slice(0, maxBlogCards));
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
        setBlogs([]);
      }
    };

    fetchLatestBlogs();
  }, [blogCategory, maxBlogCards]);

  // Update visible blogs whenever blogs or currentSlide changes
  useEffect(() => {
    const blogsPerSlide = 1; // Change from 3 to 1
    const startIndex = currentSlide * blogsPerSlide;
    setVisibleBlogs(blogs.slice(startIndex, startIndex + 3)); // Keep displaying 3 cards
  }, [blogs, currentSlide]);

  const handleSlideChange = (newSlide: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(newSlide);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the CSS transition duration
  };

  const nextSlide = () => {
    const totalSlides = blogs.length - 2; // New total slides calculation
    const newSlide = currentSlide === totalSlides ? 0 : currentSlide + 1;
    handleSlideChange(newSlide);
  };

  const prevSlide = () => {
    const totalSlides = blogs.length - 2; // New total slides calculation
    const newSlide = currentSlide === 0 ? totalSlides : currentSlide - 1;
    handleSlideChange(newSlide);
  };

  const goToSlide = (slideIndex: number) => {
    handleSlideChange(slideIndex);
  };

  const totalSlides = blogs.length - 2;
  const showCarouselControls = totalSlides > 1;

  return (
    <section
      className={`bg-off-white px-4 py-8 md:px-8 lg:p-20 flex flex-col gap-6 md:gap-12 items-${alignText}`}
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="subtitleText text-neutral-mid ">{subtitleText}</h2>

        {showCarouselControls && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
              aria-label="Previous slide"
              disabled={isTransitioning}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
              aria-label="Next slide"
              disabled={isTransitioning}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {bodyText && <p className="bodyText neutralText">{bodyText}</p>}

      <div className="w-full overflow-hidden">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-500 ease-in-out"
          style={{ opacity: isTransitioning ? 0.5 : 1 }}
        >
          {visibleBlogs.map((blog, index) => (
            <BlogCard key={`${currentSlide}-${index}`} {...blog} />
          ))}
        </div>

        {showCarouselControls && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-primary-900 w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        )}
      </div>

      {buttonText && (
        <a
          href={buttonLink}
          rel="noopener noreferrer"
          className="w-full text-center"
        >
          <button className={`${buttonType}-button text-${alignText}`}>
            {buttonText}
          </button>
        </a>
      )}
    </section>
  );
};

export default BlogCarouselSection;
