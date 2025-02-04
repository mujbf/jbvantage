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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Fund Sizes</h2>

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
        {["vefFundSize", "mmfFundSize", "sgfFundSize"].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 font-bold mb-2">
              {field.replace("FundSize", " Fund Size")}
            </label>
            <input
              type="text"
              name={field}
              value={fundSizes[field as keyof FundSizesFormData]}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Fund Sizes
        </button>
      </form>
    </div>
  );
};

export default FundSizesAdmin;
