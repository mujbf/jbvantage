import BlogHeader from "../components/sections/blog/BlogHeader";
import BlogFeaturedSection from "../components/sections/blog/BlogFeaturedSection";
import ColumnsSection from "../components/sections/ColumnsSection";

const Blog: React.FC = () => {
  return (
    <>
      <BlogHeader
        title="The Journal"
        description="Our thoughts on the investing environment, economy, and more."
        tags={["All", "Stocks", "Bonds", "Retirement Planning", "News"]}
      />
      <BlogFeaturedSection
        imageSrc="/images/blog/sample-blog-1.jpg"
        category="Finance"
        readingTime="3 Min"
        title="The Power of Compound Interest"
        description="Discover how compound interest can help grow your wealth over time."
        buttonText="Read More"
      />
      <ColumnsSection
        subtitleText=""
        bodyText=""
        buttonText=""
        buttonType="primary" // 'primary' | 'secondary'
        cardType="blog"
        alignText="left" // Change to "left" or "center"
      />
    </>
  );
};

export default Blog;
