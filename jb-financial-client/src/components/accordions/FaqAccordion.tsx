import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-title cursor-pointer switzer-sb text-neutral-light text-base md:text-2xl flex justify-between items-center p-6 ${
              activeIndex === index
                ? "border-primary-900 border-2 rounded-xl text-primary-900"
                : "border-y-2 border-neutral-lightest"
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {faq.question}
            <span
              className={`${
                activeIndex === index ? "text-primary-900" : "text-neutral-mid"
              }`}
            >
              {activeIndex === index ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {activeIndex === index && (
            <div className="accordion-content p-6">
              <p className="bodyText neutralText">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
