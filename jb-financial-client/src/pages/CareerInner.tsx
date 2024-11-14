import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PDFUploadForm from "../components/forms/PDFUploadForm.tsx";
import { SERVER_URL } from "../Constants.tsx";

interface ContentItem {
  heading: string;
  paragraphs: string[];
}

interface CareerData {
  title: string;
  location: string;
  tags: string[];
  content: ContentItem[];
}

const CareerInner: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the job ID from the URL
  const [career, setCareer] = useState<CareerData | null>(null);

  // Create a ref for the application form section
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch career data from your API using the job ID
    fetch(`${SERVER_URL}/api/careers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCareer({
          title: data.title,
          location: data.location,
          tags: data.tags,
          content: data.content, // Assume the content structure is already correct
        });
      })
      .catch((error) => console.error("Error fetching career data:", error));
  }, [id]);

  // Function to handle smooth scrolling
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Function to split paragraph into sentences
  const splitIntoSentences = (paragraph: string): string[] => {
    // Split by period but preserve periods that are part of decimals or abbreviations
    // This regex looks for periods followed by a space or end of string
    return paragraph
      .split(/\.(?=\s|$)/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  };

  return career ? (
    <>
      <div className="h-[72px]"></div>
      <section className="px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16 items-start">
        <div className="flex flex-col gap-4 items-start">
          <h5 className="zodiak-r text-3xl md:text-6xl text-neutral-mid">
            {career.title}
          </h5>
          <p className="bodyText text-neutral-mid">{career.location}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
          <div className="flex gap-2 md:gap-6 h-fit">
            {career.tags.map((tag, index) => (
              <span
                key={index}
                className="switzer-sb text-xs md:text-base text-neutral-mid uppercase px-3 md:px-6 py-2 border border-neutral-mid rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="primary-button" onClick={scrollToForm}>
            Apply Now
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16">
        {career.content.map((contentItem, index) => (
          <div
            key={index}
            className="content-block flex flex-col gap-4 md:gap-8"
          >
            <h6 className="heading switzer-sb text-xl md:text-2xl text-neutral-mid">
              {contentItem.heading}
            </h6>
            <ul className="list-disc pl-6 space-y-2">
              {contentItem.paragraphs.flatMap((paragraph, pIndex) =>
                splitIntoSentences(paragraph).map((sentence, sIndex) => (
                  <li
                    key={`${pIndex}-${sIndex}`}
                    className="bodyText text-neutral-mid"
                  >
                    {sentence}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </section>

      {/* Careers Form Section */}
      <section
        ref={formRef}
        className="bg-white px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16"
      >
        <PDFUploadForm position={career.title} />
      </section>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default CareerInner;
