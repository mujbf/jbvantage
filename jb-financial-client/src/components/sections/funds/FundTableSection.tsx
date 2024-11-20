import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../Constants.tsx";

interface FundData {
  fundType: string;
  oneMonth: string;
  threeMonths: string;
  sixMonths: string;
  ytd: string;
  oneYear: string;
  threeYear: string;
  fiveYear: string;
  si: string;
}

interface FundTable {
  asAtDate: string;
  columns: string[];
  data: FundData[];
}

const FundTableViewer: React.FC = () => {
  const [fundTable, setFundTable] = useState<FundTable | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch fund table data
  const fetchFundData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER_URL}/api/fund-performance-summary`
      ); // Replace with your actual API endpoint
      setFundTable(response.data);
    } catch (err) {
      setError("Failed to load fund data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!fundTable) {
    return <p>No data available</p>;
  }

  return (
    <div className="bg-white px-4 py-8 md:px-8 lg:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-6 md:gap-8 lg:gap-16">
      <h2 className="subtitleText text-neutral-mid text-left">
        Fund performance summary
      </h2>
      <p className="bodyText text-left">
        As at :{" "}
        <span className="text-primary-900 switzer-md">
          {fundTable.asAtDate}
        </span>
      </p>

      {/* Outer div with overflow and width management */}
      <div className="w-full overflow-x-auto shadow-md rounded-sm md:rounded-lg">
        {/* Inner div with shadow, rounded corners and min-width */}
        <div className="min-w-max rounded-lg">
          <table className="w-full bg-white text-left border-collapse switzer-r">
            <thead className="bg-gray-200">
              <tr>
                {fundTable.columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-2 md:px-6 py-3 md:py-6 switzer-sb text-xs md:text-base font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fundTable.data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.fundType}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.oneMonth}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.threeMonths}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.sixMonths}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.ytd}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.oneYear}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.threeYear}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.fiveYear}
                  </td>
                  <td className="px-2 md:px-6 py-3 md:py-6 text-neutral-mid text-xs md:text-base text-gray-700 whitespace-nowrap">
                    {row.si}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="regularText text-left">
          Returns shown are after all taxes, fees and expenses and based on NAV
        </p>
        <p className="regularText text-left">
          All returns shown are annualized except for VEF less than 1 year.
        </p>
        <p className="regularText text-left">*SI – Since Inception</p>
        {/* <p className="regularText text-left">
          **TER - Total Expense Ratio, and is calculated by dividing total fund
          costs by total fund assets.
        </p> */}
      </div>
    </div>
  );
};

export default FundTableViewer;
