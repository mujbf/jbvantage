import React, { useState, useEffect } from "react";

// Replace this with your actual server URL or environment variable
import { SERVER_URL } from "../../../Constants.tsx";

interface FundData {
  fundType: string;
  oneMonth: string;
  threeMonths: string;
  sixMonths: string;
  ytd: string;
  oneYear: string;
  threeYear: string;
  fiveear: string;
  si: string;
}

const FundTableAdmin: React.FC = () => {
  const [data, setData] = useState<FundData[]>([]);
  const [asAtDate, setAsAtDate] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch initial table data from the API
    fetch(`${SERVER_URL}/api/fund-performance-summary`)
      .then((response) => response.json())
      .then((data) => {
        setAsAtDate(data.asAtDate);
        setColumns(data.columns);
        setData(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (
    index: number,
    field: keyof FundData,
    value: string
  ) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleFundTypeChange = (index: number, value: string) => {
    const updatedData = [...data];
    updatedData[index].fundType = value;
    setData(updatedData);
  };

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const tableData = { asAtDate, columns, data };

    fetch(`${SERVER_URL}/api/fund-performance-summary`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tableData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Data saved:", result);
        alert("Changes saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Error saving changes. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-6 md:gap-8 lg:gap-16">
      <h2 className="subtitleText text-neutral-mid text-left">
        Fund performance summary (Admin)
      </h2>
      <div className="flex items-center gap-2">
        <label htmlFor="asAtDate" className="bodyText">
          As at:
        </label>
        <input
          id="asAtDate"
          type="text"
          value={asAtDate}
          onChange={(e) => setAsAtDate(e.target.value)}
          className="bodyText text-primary-900 switzer-md border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="w-full overflow-x-auto shadow-md rounded-sm md:rounded-lg">
        <div className="min-w-max rounded-lg">
          <table className="w-full bg-white text-left border-collapse switzer-r">
            <thead className="bg-gray-200">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-2 md:px-6 py-3 md:py-6 switzer-sb text-xs md:text-base font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300"
                  >
                    <input
                      type="text"
                      value={column}
                      onChange={(e) =>
                        handleColumnChange(index, e.target.value)
                      }
                      className="w-full bg-transparent"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((fund, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    <input
                      type="text"
                      value={fund.fundType}
                      onChange={(e) =>
                        handleFundTypeChange(index, e.target.value)
                      }
                      className="w-full bg-transparent"
                    />
                  </td>
                  {Object.entries(fund)
                    .filter(([key]) => key !== "fundType" && key !== "_id")
                    .map(([key, value]) => (
                      <td
                        key={key}
                        className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap"
                      >
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              key as keyof FundData,
                              e.target.value
                            )
                          }
                          className="w-full bg-transparent"
                        />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="primary-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving changes..." : "Submit Changes"}
      </button>
      <div>
        <p className="regularText text-left">
          Returns shown are after all taxes, fees and expenses and based on NAV
        </p>
        <p className="regularText text-left">
          All returns shown are annualized
        </p>
        <p className="regularText text-left">*SI – Since Inception</p>
        <p className="regularText text-left">
          **TER - Total Expense Ratio, and is calculated by dividing total fund
          costs by total fund assets.
        </p>
      </div>
    </div>
  );
};

export default FundTableAdmin;
