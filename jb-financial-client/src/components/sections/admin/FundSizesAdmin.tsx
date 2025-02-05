import React, { useState, useEffect } from "react";

interface FundSizesFormData {
  vefFundSize: string;
  mmfFundSize: string;
  sgfFundSize: string;
}

const FundSizesAdmin: React.FC = () => {
  const [fundSizes, setFundSizes] = useState<FundSizesFormData>({
    vefFundSize: "",
    mmfFundSize: "",
    sgfFundSize: "",
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Mapping of field names to their full display names
  const fundNameMapping = {
    vefFundSize: "Value Equity Fund Size",
    mmfFundSize: "Money Market Fund Size",
    sgfFundSize: "Short Term Gilt Fund Size",
  };

  // Fetch fund sizes from the JSON file
  useEffect(() => {
    const fetchFundSizes = async () => {
      try {
        const response = await fetch("/fundSizes.json");
        const data = await response.json();
        setFundSizes(data);
      } catch (error) {
        console.error("Error fetching fund sizes:", error);
        setMessage({ text: "Failed to fetch fund sizes", type: "error" });
      }
    };

    fetchFundSizes();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFundSizes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save fund sizes to local storage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fundSizes.vefFundSize ||
      !fundSizes.mmfFundSize ||
      !fundSizes.sgfFundSize
    ) {
      setMessage({ text: "Please fill in all fund sizes", type: "error" });
      return;
    }

    try {
      localStorage.setItem("fundSizes", JSON.stringify(fundSizes));
      setMessage({ text: "Fund sizes updated successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving fund sizes:", error);
      setMessage({ text: "Failed to update fund sizes", type: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="subtitleText text-neutral-mid">Fund Size</h2>
        <p className="bodyText text-neutral-mid">
          Update the recent fund size of all 3 funds.
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {Object.keys(fundNameMapping).map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block switzer-sb mb-2 text-neutral-mid">
              {fundNameMapping[field as keyof typeof fundNameMapping]}
            </label>
            <input
              type="text"
              name={field}
              value={fundSizes[field as keyof FundSizesFormData]}
              onChange={handleInputChange}
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-full"
              required
            />
          </div>
        ))}
        <br />

        <button type="submit" className="primary-button">
          Update Fund Sizes
        </button>
      </form>
    </div>
  );
};

export default FundSizesAdmin;
