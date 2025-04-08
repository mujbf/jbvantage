import React, { useState, FormEvent } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Constants.tsx";

interface ContactFormNProps {
  meetingUrl?: string; // External URL for scheduling meetings
}

const ContactFormN: React.FC<ContactFormNProps> = ({
  meetingUrl = "https://calendly.com/", // Default meeting URL if none provided
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [activeTab, setActiveTab] = useState<"callback" | "meeting" | null>(
    null
  );

  const validateMobileNumber = (number: string) => {
    // Basic mobile number validation - allows international format
    // Accepts formats like: +1234567890, 1234567890, +12 345 6789, etc.
    const mobileRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,10}$/;
    return mobileRegex.test(number);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate mobile number on change
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

    // Validate mobile number before submission
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
        formData
      );

      if (response.data.success) {
        setSubmitStatus("Message sent successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
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

  const handleTabClick = (tab: "callback" | "meeting") => {
    if (tab === "meeting") {
      window.open(meetingUrl, "_blank");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-10 p-4 md:p-12 bg-off-white shadow-2xl rounded-3xl">
      <h3 className="subtitleText text-neutral-mid text-center mb-6">
        Get in Touch
      </h3>

      {/* Tabs container */}
      {!activeTab && (
        <div className="grid grid-cols-2 gap-4">
          {/* Request a Callback Tab */}
          <button
            onClick={() => handleTabClick("callback")}
            className="flex flex-col items-center justify-center p-6 aspect-square bg-white border border-neutral-lighter hover:border-primary-500 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-primary-500 mb-4 md:mb-12">
              <img
                src="/icons/phone.png"
                alt="Phone icon"
                className="h-12 w-12 md:h-20 md:w-20"
              />
            </div>
            <span className="switzer-sb text-neutral-mid font-medium text-sm md:text-lg">
              Request a callback
            </span>
          </button>

          {/* Schedule Online Meeting Tab */}
          <button
            onClick={() => handleTabClick("meeting")}
            className="flex flex-col items-center justify-center p-6 aspect-square bg-white border border-neutral-lighter hover:border-primary-500 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-primary-500 mb-4 md:mb-12">
              <img
                src="/icons/headphones.png"
                alt="Phone icon"
                className="h-12 w-12 md:h-20 md:w-20"
              />
            </div>
            <span className="switzer-sb text-neutral-mid font-medium text-sm md:text-lg">
              Schedule online meeting
            </span>
          </button>
        </div>
      )}

      {/* Form appears when "Request a Callback" is selected */}
      {activeTab === "callback" && (
        <>
          <button
            onClick={() => setActiveTab(null)}
            className="switzer-md self-start mb-4 flex items-center text-neutral-mid hover:text-primary-900 hover:text-primary-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go back
          </button>

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
        </>
      )}
    </div>
  );
};

export default ContactFormN;
