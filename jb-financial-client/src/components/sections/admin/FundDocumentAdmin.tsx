import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../Constants.tsx";

interface FundDocumentAdminProps {}

const FundDocumentAdmin: React.FC<FundDocumentAdminProps> = ({}) => {
  const [valueEquityFile, setValueEquityFile] = useState<File | null>(null);
  const [moneyMarketFile, setMoneyMarketFile] = useState<File | null>(null);
  const [shortTermGiltFile, setShortTermGiltFile] = useState<File | null>(null);
  const [valueEquityFile2, setValueEquityFile2] = useState<File | null>(null);
  const [moneyMarketFile2, setMoneyMarketFile2] = useState<File | null>(null);
  const [shortTermGiltFile2, setShortTermGiltFile2] = useState<File | null>(
    null
  );

  // Handler for file input changes
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (fundName: string, file: File | null) => {
    if (!file) return alert("Please upload a file");

    // Create form data to send the file to the server
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fundName", fundName);

    try {
      // Send the file to the server
      const response = await axios.post(
        `${SERVER_URL}/upload-fund-document`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="subtitleText text-neutral-mid">Fund Documents</h2>
        <p className="bodyText text-neutral-mid">Update fund documents.</p>
      </div>
      <div className="flex gap-4 md:gap-8">
        {/* Value Equity Fund */}
        <div className="bg-[#fbfbfd] p-4 border border-neutral-lighter rounded shadow-sm flex flex-col flex-grow gap-4">
          <p className="bodyText text-neutral-mid">Value Equity Fund</p>
          <br />
          <p className="regularText">Monthly Factsheet</p>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
              onChange={(e) => handleFileChange(e, setValueEquityFile)}
            />
            <button
              className="primary-button-2"
              onClick={() => handleSubmit("Value Equity Fund", valueEquityFile)}
            >
              Submit
            </button>
          </div>
          <p className="regularText">Historical Unit Prices</p>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
              onChange={(e) => handleFileChange(e, setValueEquityFile2)}
            />
            <button
              className="primary-button-2"
              onClick={() =>
                handleSubmit("Value Equity Fund 2", valueEquityFile2)
              }
            >
              Submit
            </button>
          </div>
        </div>

        {/* Money Market Fund */}
        <div className="bg-[#fbfbfd] p-4 border border-neutral-lighter rounded shadow-sm flex flex-col flex-grow gap-4">
          <p className="bodyText text-neutral-mid">Money Market Fund</p>
          <br />
          <p className="regularText">Monthly Factsheet</p>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
              onChange={(e) => handleFileChange(e, setMoneyMarketFile)}
            />
            <button
              className="primary-button-2"
              onClick={() => handleSubmit("Money Market Fund", moneyMarketFile)}
            >
              Submit
            </button>
          </div>
          <p className="regularText">Historical Unit Prices</p>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
              onChange={(e) => handleFileChange(e, setMoneyMarketFile2)}
            />
            <button
              className="primary-button-2"
              onClick={() =>
                handleSubmit("Money Market Fund 2", moneyMarketFile2)
              }
            >
              Submit
            </button>
          </div>
        </div>

        {/* Short Term Gilt Fund */}
        <div className="bg-[#fbfbfd] p-4 border border-neutral-lighter rounded shadow-sm flex flex-col flex-grow gap-4">
          <p className="bodyText text-neutral-mid">Short Term Gilt Fund</p>
          <br />
          <p className="regularText">Monthly Factsheet</p>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
              onChange={(e) => handleFileChange(e, setShortTermGiltFile)}
            />
            <button
              className="primary-button-2"
              onClick={() =>
                handleSubmit("Short Term Gilt Fund", shortTermGiltFile)
              }
            >
              Submit
            </button>
          </div>
          <p className="regularText">Historical Unit Prices</p>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
              onChange={(e) => handleFileChange(e, setShortTermGiltFile2)}
            />
            <button
              className="primary-button-2"
              onClick={() =>
                handleSubmit("Short Term Gilt Fund 2", shortTermGiltFile2)
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDocumentAdmin;
