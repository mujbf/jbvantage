import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../Constants.tsx";

type FundCode = "VEF" | "MMF" | "SGF" | "COF";

interface FundApplicationSectionProps {
  // When not given (e.g. on the Funds page), the user picks the fund from a dropdown
  fundCode?: FundCode;
  fundName?: string;
  sectionTitle?: string;
  description?: string;
}

interface SubmittedReference {
  reference: string;
  label: string;
}

// Total size allowed for all files in one submission (in MB)
// Keep in sync with MAX_TOTAL_SIZE_MB in the backend fundApplicationRouter.js
const MAX_TOTAL_SIZE_MB = 20;
const MAX_TOTAL_SIZE = MAX_TOTAL_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// Links like /funds#upload-applications scroll to this section
const SECTION_ID = "upload-applications";

const funds: { code: FundCode; name: string }[] = [
  { code: "VEF", name: "JB Vantage Value Equity Fund" },
  { code: "MMF", name: "JB Vantage Money Market Fund" },
  { code: "SGF", name: "JB Vantage Short Term Gilt Fund" },
  { code: "COF", name: "JB Vantage Credit Opportunity Fund" },
];

// One upload slot per document; field names match the backend
const documentSlots = [
  { field: "applicationForm", label: "Application Form" },
  { field: "purchaseForm", label: "Purchase Form" },
  { field: "switchForm", label: "Switch Form" },
  { field: "redemptionForm", label: "Redemption Form" },
  { field: "kycForm", label: "KYC Form" },
];

const emptyDetails = {
  fullName: "",
  nic: "",
  email: "",
  website: "", // Hidden field, left empty by real users
};

const FundApplicationSection: React.FC<FundApplicationSectionProps> = ({
  fundCode,
  fundName,
  sectionTitle = "Submit Your Forms",
  description = "Completed your forms? Share your details and upload them here, and our team will get in touch with you.",
}) => {
  const [details, setDetails] = useState(emptyDetails);
  const [selectedFund, setSelectedFund] = useState<string>(fundCode || "");
  const [files, setFiles] = useState<Record<string, File>>({});
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [references, setReferences] = useState<SubmittedReference[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const idPrefix = fundCode || "funds";
  const attachedFiles = Object.values(files);
  const totalSize = attachedFiles.reduce((sum, file) => sum + file.size, 0);

  // Scroll here when the page is opened with #upload-applications
  // (after the page loading spinner has cleared)
  useEffect(() => {
    if (location.hash !== `#${SECTION_ID}`) return;
    const timeoutId = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [location.hash]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = e.target.files?.[0];
    // Clear the input so the same file can be chosen again after removing it
    e.target.value = "";
    if (!file) return;

    const otherFilesSize = Object.entries(files)
      .filter(([name]) => name !== field)
      .reduce((sum, [, existing]) => sum + existing.size, 0);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Only PDF, JPG and PNG files are allowed");
    } else if (otherFilesSize + file.size > MAX_TOTAL_SIZE) {
      setFileError(
        `The total size of all files must be ${MAX_TOTAL_SIZE_MB}MB or less`,
      );
    } else {
      setFileError("");
      setFiles((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleRemoveFile = (field: string) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFileError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReferences([]);

    if (!selectedFund) {
      setSubmitStatus("Please select a fund.");
      return;
    }
    if (attachedFiles.length === 0) {
      setSubmitStatus("Please attach at least one document.");
      return;
    }

    const formData = new FormData();
    formData.append("fundCode", selectedFund);
    Object.entries(details).forEach(([name, value]) => {
      formData.append(name, value);
    });
    Object.entries(files).forEach(([field, file]) => {
      formData.append(field, file);
    });

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/fund-application`,
        formData,
      );

      if (response.data.success) {
        setSubmitStatus(
          "Your documents were submitted successfully! A confirmation has been sent to your email, and our team will be in touch.",
        );
        setReferences(response.data.references || []);
        // Reset form
        setDetails(emptyDetails);
        setSelectedFund(fundCode || "");
        setFiles({});
        setFileError("");
        formRef.current?.reset();
      } else {
        throw new Error(response.data.message || "Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting fund application:", error);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Submission failed. Please try again.";
      setSubmitStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "px-6 py-4 border border-neutral-lighter focus:border-primary-800 rounded-lg switzer-r text-neutral-mid w-full";

  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16"
    >
      <h4 className="subtitleText text-neutral-mid">{sectionTitle}</h4>
      <p className="bodyText text-neutral-mid">{description}</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:gap-10 p-4 md:p-12 bg-off-white shadow-2xl rounded-3xl"
      >
        {fundCode ? (
          <h3 className="zodiak-r text-xl md:text-4xl text-neutral-mid">
            {fundName}
          </h3>
        ) : (
          <select
            name="fundCode"
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className={`${inputClass} bg-white`}
            required
          >
            <option value="" disabled>
              Select a Fund
            </option>
            {funds.map((fund) => (
              <option key={fund.code} value={fund.code}>
                {fund.name}
              </option>
            ))}
          </select>
        )}

        {/* Your Details */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <input
            type="text"
            name="fullName"
            value={details.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            maxLength={150}
            className={inputClass}
            required
          />
          <input
            type="text"
            name="nic"
            value={details.nic}
            onChange={handleInputChange}
            placeholder="NIC / Passport Number"
            maxLength={30}
            className={inputClass}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          value={details.email}
          onChange={handleInputChange}
          placeholder="Email"
          maxLength={150}
          className={inputClass}
          required
        />

        {/* Hidden field to filter out automated submissions */}
        <input
          type="text"
          name="website"
          value={details.website}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Documents */}
        <div className="flex flex-col gap-2">
          <h5 className="switzer-sb text-neutral-mid text-lg md:text-xl">
            Upload Your Documents
          </h5>
          <p className="switzer-r text-neutral-light text-sm md:text-base">
            Upload one file for each form relevant to your request. PDF, JPG or
            PNG, up to {MAX_TOTAL_SIZE_MB}MB in total.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {documentSlots.map((slot) => {
            const file = files[slot.field];
            const inputId = `${idPrefix}-${slot.field}`;
            return (
              <div
                key={slot.field}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 px-6 py-3 bg-white border border-neutral-lighter rounded-lg switzer-r text-neutral-mid"
              >
                <div className="flex flex-col">
                  <span className="switzer-md">{slot.label}</span>
                  {file && (
                    <span className="text-neutral-light text-sm break-all">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  )}
                </div>
                {file ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(slot.field)}
                    className="switzer-md text-sm text-red-500 hover:underline shrink-0 w-fit"
                  >
                    Remove
                  </button>
                ) : (
                  <>
                    <label
                      htmlFor={inputId}
                      className="secondary-button-2 w-fit cursor-pointer shrink-0"
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      id={inputId}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, slot.field)}
                      className="sr-only"
                    />
                  </>
                )}
              </div>
            );
          })}
          {fileError && (
            <span className="switzer-r text-red-500 text-sm">{fileError}</span>
          )}
          {attachedFiles.length > 0 && (
            <span className="switzer-r text-neutral-light text-sm">
              {attachedFiles.length}{" "}
              {attachedFiles.length === 1 ? "file" : "files"},{" "}
              {(totalSize / 1024 / 1024).toFixed(2)} MB of {MAX_TOTAL_SIZE_MB}{" "}
              MB used
            </span>
          )}
        </div>

        {submitStatus && (
          <div
            className={`regularText p-4 rounded ${
              submitStatus.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus}
            {references.length > 0 && (
              <ul className="mt-2">
                {references.map((item) => (
                  <li key={item.reference}>
                    {item.label}: <strong>{item.reference}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`primary-button ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary-500 hover:bg-primary-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Documents"}
        </button>
      </form>
    </section>
  );
};

export default FundApplicationSection;
