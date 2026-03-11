import React, { useState, FormEvent } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Constants.tsx";

interface HerWealthContactFormProps {}

const HerWealthContactForm: React.FC<HerWealthContactFormProps> = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    jobTitle: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const validateMobileNumber = (number: string) => {
    const mobileRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,10}$/;
    return mobileRegex.test(number);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "mobile") {
      if (!value) {
        setFormErrors((prev) => ({
          ...prev,
          mobile: "Mobile number is required",
        }));
      } else if (!validateMobileNumber(value)) {
        setFormErrors((prev) => ({
          ...prev,
          mobile: "Please enter a valid mobile number",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, mobile: "" }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateMobileNumber(formData.mobile)) {
      setFormErrors((prev) => ({
        ...prev,
        mobile: "Please enter a valid mobile number",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/send-email`,
        formData,
      );

      if (response.data.success) {
        setSubmitStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          jobTitle: "",
          message: "",
        });
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-screen h-fit md:h-auto px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col md:flex-row gap-4 md:gap-16 items-center">
      <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-12 ">
        <h1 className="titleText text-primary-900 mt-[72px] md:mt-0">
          Contact Us
        </h1>
        <p className="bodyText text-neutral-mid">
          For any inquiries, please feel free to reach out to us.
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <img src="/icons/mail-primary.svg" alt="Email icon" />
            <p className="bodyText text-neutral-mid">
              <a
                href="mailto:info.financial@jb.lk"
                className="hover:text-neutral-dark"
              >
                info.financial@jb.lk
              </a>{" "}
              <br />
              <a
                href="mailto:customercare@jb.lk"
                className="hover:text-neutral-dark"
              >
                customercare@jb.lk
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <img src="/icons/phone-primary.svg" alt="Phone icon" />
            <p className="bodyText text-neutral-mid flex flex-col">
              <a href="tel:+94702111999" className="hover:text-neutral-dark">
                +94 70 211 1999 (Hotline)
              </a>{" "}
              <a href="tel:+94112490900" className="hover:text-neutral-dark">
                +94 11 249 0900 (General)
              </a>{" "}
              {/* <br /> */}
              <span>(Working Hours: Mon - Fri from 9AM - 5PM)</span>
              {/* <a href="tel:+94112490950" className="hover:text-neutral-dark">
                  +94 11 249 0950
                </a>{" "}
                <br />
                <a href="tel:+94112490952" className="hover:text-neutral-dark">
                  +94 11 249 0952
                </a> */}
            </p>
          </div>
          <div className="flex gap-4">
            <img src="/icons/map-primary.svg" alt="Map icon" />
            <p className="bodyText text-neutral-mid">
              <a
                href="https://www.google.com/maps?q=150,+St.+Joseph%E2%80%99s+Street,+Colombo+14,+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-dark"
              >
                150, St. Joseph’s Street, <br />
                Colombo 14, Sri Lanka.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex flex-col gap-4 md:gap-10 p-4 md:p-12 bg-off-white shadow-2xl rounded-3xl">
          <h3 className="subtitleText text-neutral-mid text-center mb-6">
            Get in Touch
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6"
          >
            {submitStatus && (
              <div
                className={`regularText p-4 rounded ${
                  submitStatus.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="px-6 py-4 border border-neutral-lighter focus:border-primary-800 rounded-lg switzer-r text-neutral-mid"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="px-6 py-4 border border-neutral-lighter focus:border-primary-800 rounded-lg switzer-r text-neutral-mid"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Your Mobile Number"
                className={`px-6 py-4 border ${
                  formErrors.mobile
                    ? "border-red-500 focus:border-red-500"
                    : "border-neutral-lighter focus:border-primary-800"
                } rounded-lg switzer-r text-neutral-mid`}
                required
              />
              {formErrors.mobile && (
                <span className="switzer-r text-red-500 text-sm mt-1">
                  {formErrors.mobile}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Your Job Title"
                className="px-6 py-4 border border-neutral-lighter focus:border-primary-800 rounded-lg switzer-r text-neutral-mid"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="px-6 py-4 border border-neutral-lighter focus:border-primary-800 rounded-lg switzer-r text-neutral-mid"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!formErrors.mobile}
              className={`primary-button ${
                isSubmitting || !!formErrors.mobile
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HerWealthContactForm;
