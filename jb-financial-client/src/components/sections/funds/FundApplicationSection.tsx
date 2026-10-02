import React, { useState, useRef, FormEvent } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../Constants.tsx";

interface FundApplicationSectionProps {
  fundCode: "VEF" | "MMF" | "SGF" | "COF";
  fundName: string;
  sectionTitle?: string;
  description?: string;
}

// Total size allowed for all files in one submission (in MB)
// Keep in sync with MAX_TOTAL_SIZE_MB in the backend fundApplicationRouter.js
const MAX_TOTAL_SIZE_MB = 20;
const MAX_TOTAL_SIZE = MAX_TOTAL_SIZE_MB * 1024 * 1024;
const MAX_FILES = 10;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

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
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    // Clear the input so more files can be added to the list afterwards
    e.target.value = "";

    // Skip files that are already in the list
    const added = selected.filter(
      (file) =>
        !files.some(
          (existing) =>
            existing.name === file.name && existing.size === file.size,
        ),
    );

    const totalSize = [...files, ...added].reduce(
      (sum, file) => sum + file.size,
      0,
    );

    if (added.some((file) => !ALLOWED_TYPES.includes(file.type))) {
      setFileError("Only PDF, JPG and PNG files are allowed");
    } else if (files.length + added.length > MAX_FILES) {
      setFileError(`You can attach up to ${MAX_FILES} files`);
    } else if (totalSize > MAX_TOTAL_SIZE) {
      setFileError(
        `The total size of all files must be ${MAX_TOTAL_SIZE_MB}MB or less`,
      );
    } else {
      setFileError("");
      setFiles([...files, ...added]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      setSubmitStatus("Please attach at least one document.");
      return;
    }

    const formData = new FormData();
    formData.append("fundCode", fundCode);
    Object.entries(details).forEach(([name, value]) => {
      formData.append(name, value);
    });
    files.forEach((file) => formData.append("documents", file));

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/fund-application`,
        formData,
      );

      if (response.data.success) {
        setSubmitStatus(
          "Your documents were submitted successfully! Our team will be in touch.",
        );
        // Reset form
        setDetails(emptyDetails);
        setFiles([]);
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
    <section className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16">
      <h4 className="subtitleText text-neutral-mid">{sectionTitle}</h4>
      <p className="bodyText text-neutral-mid">{description}</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:gap-10 p-4 md:p-12 bg-off-white shadow-2xl rounded-3xl"
      >
        <h3 className="zodiak-r text-xl md:text-4xl text-neutral-mid">
          {fundName}
        </h3>

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
            Attach all the forms relevant to your request (Application, KYC,
            Nominee, Purchase, Switch or Redemption). PDF, JPG or PNG, up to{" "}
            {MAX_TOTAL_SIZE_MB}MB in total.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label
            htmlFor={`${fundCode}-documents`}
            className="secondary-button-2 w-fit cursor-pointer"
          >
            {files.length > 0 ? "Add More Documents" : "Upload Documents"}
          </label>
          <input
            type="file"
            id={`${fundCode}-documents`}
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            className="sr-only"
          />
          {fileError && (
            <span className="switzer-r text-red-500 text-sm">{fileError}</span>
          )}
          {files.length > 0 && (
            <span className="switzer-r text-neutral-light text-sm">
              {files.length} {files.length === 1 ? "file" : "files"},{" "}
              {(
                files.reduce((sum, file) => sum + file.size, 0) /
                1024 /
                1024
              ).toFixed(2)}{" "}
              MB of {MAX_TOTAL_SIZE_MB} MB used
            </span>
          )}
          {files.length > 0 && (
            <ul className="flex flex-col gap-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}`}
                  className="flex items-center justify-between gap-4 px-6 py-3 bg-white border border-neutral-lighter rounded-lg switzer-r text-neutral-mid"
                >
                  <span className="break-all">
                    {file.name}
                    <span className="text-neutral-light text-sm">
                      {" "}
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="switzer-md text-sm text-red-500 hover:underline shrink-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
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
