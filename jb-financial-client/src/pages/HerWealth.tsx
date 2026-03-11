import React, { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import PlainTextSection from "../components/sections/PlainTextSection";
import HerWealthContactForm from "../components/forms/HerWealthContactForm";
import TestimonialSection from "../components/sections/TestimonialSection";

const TESTIMONIALS_JSON_PATH = "/site-data/herwealth.json";

const HerWealth: React.FC = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(TESTIMONIALS_JSON_PATH)
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error loading testimonials:", error));
  }, []);

  return (
    <>
      <HeroSection
        title=""
        highlightedText=""
        description=""
        button1Text=""
        button1Link=""
        button2Text=""
        desktopImage="/images/hero/herwealth-d.jpg"
        mobileImage="/images/hero/herwealth-m.jpg"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/home-t.webp"
        renderLeftContent={false}
      />
      <PlainTextSection
        subtitle="Expert-Led Strategies for Lasting Financial Empowerment"
        body={[
          "Welcome to the first step in taking control of building your wealth. Financial literacy isn’t just about numbers; it’s about freedom, security, and the ability to make choices that align with your values. Too often, women are socialized to prioritize caregiving roles, which can leave their own financial futures underdeveloped. By reframing wealth-building as an act of empowerment, you’re advocating for a shift that can ripple across generations.",
          "Our goal is to help you to shift perspective from “money as survival” to “money as empowerment.” Our team of professional advisors will guide you in education on how you can best manage your money, and how compounding as well as investing in equity related unit trusts can help you to build wealth in the long term. It’s time we embrace wealth-building as an act of self-care and empowerment, because when women thrive financially, families and communities thrive too.",
        ]}
        bodyWidth="80%"
        textAlign="center"
        bgColor="bg-white"
      />
      <TestimonialSection testimonials={testimonials} />
      <HerWealthContactForm />
    </>
  );
};

export default HerWealth;
