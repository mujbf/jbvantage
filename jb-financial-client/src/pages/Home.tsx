import React, { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import ColumnsSection from "../components/sections/ColumnsSection";
import SideContentSection from "../components/sections/SideContentSection";
import AccordionSection from "../components/sections/AccordionSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import BlogCarouselSection from "../components/sections/BlogCarouselSection";
// import NoticePopup from "../components/popup/NoticePopup"; // Import the new NoticePopup component

const TESTIMONIALS_JSON_PATH = "/site-data/testimonials.json";

const fundsData = [
  {
    category: "Young Professional",
    description:
      "You've just started doing well in your career, and you've got many decades of professional life ahead of you. You can afford to take a little more risk, so we recommend allocating a higher proportion of funds into the JB Vantage Value Equity Fund.",
    equityPercentage: 80,
    moneyMarketPercentage: 20,
    imageUrl: "/images/strategies/young.jpg",
  },
  {
    category: "Mid Career Professional",
    description:
      "Your career is progressing well and with some years under your belt, you're starting to think about your family and its future. You want the best of both worlds, so we recommend a balanced allocation into our money market and equity funds.",
    equityPercentage: 50,
    moneyMarketPercentage: 50,
    imageUrl: "/images/strategies/mid-career.jpg",
  },
  {
    category: "Senior Professional",
    description:
      "You've made it to the top and retirement is on your mind. You don't want to take too many risks, but still have some capacity to do so. We recommend investing more into our money market funds and perhaps a little into equity.",
    equityPercentage: 20,
    moneyMarketPercentage: 80,
    imageUrl: "/images/strategies/senior.jpg",
  },
  {
    category: "Retired Individuals",
    description:
      "Time to enjoy the sunset of your life. Conservatism in how you invest is prudent, and we recommend allocating a higher proportion of funds into the JB Vantage Money Market Fund so you can access them during an emergency.",
    equityPercentage: 0,
    moneyMarketPercentage: 100,
    imageUrl: "/images/strategies/retired.jpg",
  },
  {
    category: "Corporate Treasurers",
    description:
      "You have some cash which you would rather put to work than leave lying around in a low-yield bank account. Our money market funds are highly recommended.",
    equityPercentage: 0,
    moneyMarketPercentage: 100,
    imageUrl: "/images/strategies/corporate.jpg",
  },
];

const Home: React.FC = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(TESTIMONIALS_JSON_PATH)
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error loading testimonials:", error));
  }, []);

  return (
    <>
      {/* Add the NoticePopup component here */}
      {/* <NoticePopup /> */}

      <HeroSection
        title="Reach your financial goals with ease."
        highlightedText="financial goals"
        description="With our investment products, anyone can easily invest and grow their wealth. Take advantage of our diverse range of investment options which includes both unit trusts and private wealth management services."
        button1Text="Schedule an Appointment"
        button1Link="/contact"
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/home-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/home-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/home-t.webp"
        renderLeftContent={true}
      />
      <ColumnsSection
        subtitleText="Explore our *Unit  Trusts*"
        bodyText=""
        buttonText="View All Funds"
        buttonLink="/funds"
        buttonType="secondary"
        cardType="unitTrust"
        alignText="center"
      />
      <ColumnsSection
        subtitleText="*Why  Invest*  in a Unit Trust?"
        bodyText=""
        buttonText=""
        buttonLink="/funds"
        buttonType="secondary"
        cardType="features"
        alignText="center"
      />
      <SideContentSection
        title="Private Wealth Management"
        highlightedText="Private Wealth Management"
        description="We provide institutions and high-net-worth individuals with private wealth management services where we manage portfolios on their behalf."
        buttonText="Learn More"
        buttonLink="/private-wealth-management"
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-wealth-management.webp"
      />
      <SideContentSection
        title="Experienced & Award Winning"
        highlightedText="Award Winning"
        description="Our investment committee consists of some of the most experienced and well-known names in capital market industry."
        buttonText="Meet Our Team"
        buttonLink="/team"
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/award-winning.webp"
        imageColumn={{
          title: "RECOGNIZED BY CFA",
          text: "We have been recognized multiple times by the CFA Society Sri Lanka as one of the best unit trusts in the country.",
          imageUrl: "/images/awards/cfa.png",
        }}
        swapContentAndImage={true}
      />
      <AccordionSection
        title="What kind of investment strategy works for you?"
        highlightedText="investment strategy"
        description="Here are some capital allocation strategies we recommend. They're not definitive, so we encourage talking to our investment advisors to tailor them for you."
        accordionType="fund"
        accordionProps={{ funds: fundsData }}
      />
      <ColumnsSection
        subtitleText="Latest Fund Prices"
        bodyText=""
        buttonText="View All Funds"
        buttonLink="/funds"
        buttonType="primary"
        cardType="fundPrice"
        alignText="center"
      />
      <BlogCarouselSection
        subtitleText="The Vantage Point"
        bodyText="Check out our latest insights and articles"
        buttonText="View All Posts"
        buttonType="primary"
        buttonLink="/blog"
        blogCategory="" // Optional - filter by category
        maxBlogCards={6} // Optional - default is 6
      />
      <TestimonialSection testimonials={testimonials} />
      <ColumnsSection
        subtitleText="Contact Us"
        bodyText=""
        buttonText=""
        buttonType="primary"
        cardType="contact"
        alignText="left"
      />
    </>
  );
};

export default Home;
