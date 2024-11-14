import React, { useState, useEffect } from "react";

interface Testimonial {
  logoSrc: string;
  testimonialText: string;
  testimonialImageSrc: string;
  name: string;
  designation: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-off-white border-y-2 border-neutral-lighter px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 lg:gap-8 items-center">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-full flex flex-col items-center text-center gap-4 lg:gap-8 justify-center"
            >
              {/* <img src={testimonial.logoSrc} alt="Logo" className="w-[140px]" /> */}
              <p className="bodyText neutralText w-full lg:w-1/2">
                {`“${testimonial.testimonialText}”`}
              </p>
              <div className="flex flex-col gap-4 items-center">
                {/* <img
                  src={testimonial.testimonialImageSrc}
                  alt="Testimonial"
                  className="w-16"
                /> */}
                <div className="flex flex-col gap-1">
                  <h5 className="switzer-sb text-lg lg:text-2xl primaryText">
                    {testimonial.name}
                  </h5>
                  {/* <p className="bodyText text-neutral-light">
                    {testimonial.designation}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-neutral-lighter hover:bg-primary-900 text-white p-2 rounded-full hidden lg:block w-12 h-12 flex justify-center items-center switzer-sb"
          onClick={goToPrevSlide}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-neutral-lighter hover:bg-primary-900 text-white p-2 rounded-full hidden lg:block w-12 h-12 flex justify-center items-center switzer-sb"
          onClick={goToNextSlide}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6l6 6-6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-primary-900" : "bg-neutral-lighter"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
