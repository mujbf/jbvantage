import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../../Constants";

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

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Mapping of field names to their full display names
  const fundNameMapping: Record<keyof FundSizesFormData, string> = {
    vefFundSize: "Value Equity Fund Size",
    mmfFundSize: "Money Market Fund Size",
    sgfFundSize: "Short Term Gilt Fund Size",
  };

  // Fetch fund sizes from the API
  useEffect(() => {
    const fetchFundSizes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/api/fund-sizes`);

        if (!response.ok) {
          throw new Error("Failed to fetch fund sizes");
        }

        const data = await response.json();

        // Ensure we have all the expected properties, but allow empty values
        setFundSizes({
          vefFundSize: data.vefFundSize || "",
          mmfFundSize: data.mmfFundSize || "",
          sgfFundSize: data.sgfFundSize || "",
        });
      } catch (error) {
        console.error("Error fetching fund sizes:", error);
        setMessage({ text: "Failed to fetch fund sizes", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchFundSizes();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FundSizesFormData;

    // Update fund sizes
    setFundSizes((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Format input for display
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FundSizesFormData;

    if (!value.trim()) return;

    // Format the number with commas if it's a valid number
    try {
      const numValue = parseFloat(value.replace(/,/g, ""));
      if (!isNaN(numValue)) {
        const formattedValue = numValue.toLocaleString("en-IN");
        setFundSizes((prev) => ({
          ...prev,
          [fieldName]: formattedValue,
        }));
      }
    } catch (error) {
      // If it's not a valid number, keep the original value
      console.error("Error formatting value:", error);
    }
  };

  // Save fund sizes to the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    // Prepare data for API - remove commas but maintain empty strings
    const apiData = {
      vefFundSize: fundSizes.vefFundSize
        ? fundSizes.vefFundSize.replace(/,/g, "")
        : "",
      mmfFundSize: fundSizes.mmfFundSize
        ? fundSizes.mmfFundSize.replace(/,/g, "")
        : "",
      sgfFundSize: fundSizes.sgfFundSize
        ? fundSizes.sgfFundSize.replace(/,/g, "")
        : "",
    };

    try {
      const response = await fetch(`${SERVER_URL}/api/fund-sizes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update fund sizes");
      }

      const data = await response.json();
      setMessage({ text: "Fund sizes updated successfully!", type: "success" });

      // Update local state with returned data and format it
      if (data.data) {
        setFundSizes({
          vefFundSize: formatFundSize(data.data.vefFundSize),
          mmfFundSize: formatFundSize(data.data.mmfFundSize),
          sgfFundSize: formatFundSize(data.data.sgfFundSize),
        });
      }
    } catch (error) {
      console.error("Error saving fund sizes:", error);
      setMessage({
        text:
          error instanceof Error
            ? error.message
            : "Failed to update fund sizes",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Format fund size values for display
  const formatFundSize = (value: string): string => {
    if (!value) return "";

    // Remove existing commas first
    const numValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(numValue)) {
      return numValue.toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }

    return value;
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

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-mid"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {(Object.keys(fundNameMapping) as Array<keyof FundSizesFormData>).map(
            (field) => (
              <div className="mb-4" key={field}>
                <label className="block switzer-sb mb-2 text-neutral-mid">
                  {fundNameMapping[field]}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-mid">
                    ₹
                  </span>
                  <input
                    type="text"
                    name={field}
                    value={fundSizes[field]}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="switzer-r border border-neutral-lighter rounded-lg text-sm w-full pl-8 py-2 px-3"
                    placeholder={`Enter ${fundNameMapping[field]}`}
                  />
                </div>
                <p className="text-xs text-neutral-mid mt-1">
                  {fundSizes[field]
                    ? `Current size: ₹${fundSizes[field]}`
                    : "No value set"}
                </p>
              </div>
            )
          )}
          <br />

          <button
            type="submit"
            className="primary-button flex items-center justify-center"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                Updating...
              </>
            ) : (
              "Update Fund Sizes"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default FundSizesAdmin;
