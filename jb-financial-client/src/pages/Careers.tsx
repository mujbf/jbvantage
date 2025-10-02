import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants";

// Components
import HeroSection from "../components/sections/HeroSection";
import PlainTextSection from "../components/sections/PlainTextSection";
import AccordionSection from "../components/sections/AccordionSection";
import UnitTrustGridSection from "../components/sections/UnitTrustGridSection";

const Careers: React.FC = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/jobs`);
        setJobsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load job listings. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <HeroSection
        title="Join Our Team"
        highlightedText="Our Team"
        description="Experience a supportive work culture that values collaboration and growth."
        button1Text="Current Openings"
        button1Link="#accordion-section" // Link to the accordion section
        button2Text="Contact Us"
        button2Link="/contact"
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/careers-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/careers-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/careers-t.webp"
        renderLeftContent={false}
      />
      <PlainTextSection />
      {loading ? (
        <p>Loading job listings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <AccordionSection
          id="accordion-section" // Pass the id prop
          title="Career Opportunities"
          highlightedText="Career"
          accordionType="careers"
          accordionProps={{ jobs: jobsData }}
        />
      )}
      <UnitTrustGridSection
        subtitleText="Explore our *Unit Trusts*"
        bodyText=""
        buttonText="View All Funds"
        buttonLink="/funds"
        buttonType="secondary"
        alignText="center"
      />
    </>
  );
};

export default Careers;
