import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../Constants.tsx";

interface FundYtdAdminProps {}

const FundYtdAdmin: React.FC<FundYtdAdminProps> = () => {
  const [fundData, setFundData] = useState({
    // valueEquityFund: "",
    // moneyMarketFund: "",
    // moneyMarketFundDate: "",
    // shortTermGiltFund: "",
    // shortTermGiltFundDate: "",
    vefYtdValue: "",
    vefYtdDate: "",
    vef12mValue: "",
    vef12mDate: "",
    vefBenchValue: "",
    mmfYtdValue: "",
    mmfYtdDate: "",
    mmf12mValue: "",
    mmf12mDate: "",
    mmfBenchValue: "",
    sgfYtdValue: "",
    sgfYtdDate: "",
    sgf12mValue: "",
    sgf12mDate: "",
    sgfBenchValue: "",
  });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/fundYTDScheme-performance`
        );
        setFundData(response.data);
      } catch (error) {
        console.error("Error fetching fund data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await axios.put(`${SERVER_URL}/api/fundYTDScheme-performance`, fundData);
      alert("Fund data updated successfully");
    } catch (error) {
      console.error("Error updating fund data:", error);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFundData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="subtitleText text-neutral-mid">Fund Returns</h2>
        <p className="bodyText text-neutral-mid">
          Update the Fund Return Values
        </p>
      </div>
      <div className="flex gap-4 md:gap-8">
        <div className="bg-[#fbfbfd] p-4 border border-neutral-lighter rounded shadow-sm flex flex-col flex-grow gap-4">
          <p className="bodyText text-neutral-mid">Value Equity Fund</p>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">YTD</p>
            <input
              name="vefYtdValue"
              value={fundData.vefYtdValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
            <input
              name="vefYtdDate"
              value={fundData.vefYtdDate}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">12M</p>
            <input
              name="vef12mValue"
              value={fundData.vef12mValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
            <input
              name="vef12mDate"
              value={fundData.vef12mDate}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">Benchmark</p>
            <input
              name="vefBenchValue"
              value={fundData.vefBenchValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
        </div>
        <div className="bg-[#fbfbfd] p-4 border border-neutral-lighter rounded shadow-sm flex flex-col flex-grow gap-4">
          <p className="bodyText text-neutral-mid">Money Market Fund</p>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">7D</p>
            <input
              name="mmfYtdValue"
              value={fundData.mmfYtdValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
            <input
              name="mmfYtdDate"
              value={fundData.mmfYtdDate}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">12M</p>
            <input
              name="mmf12mValue"
              value={fundData.mmf12mValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
            <input
              name="mmf12mDate"
              value={fundData.mmf12mDate}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">Benchmark</p>
            <input
              name="mmfBenchValue"
              value={fundData.mmfBenchValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
        </div>
        <div className="bg-[#fbfbfd] p-4 border border-neutral-lighter rounded shadow-sm flex flex-col flex-grow gap-4">
          <p className="bodyText text-neutral-mid">Short Term Gilt Fund</p>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">7D</p>
            <input
              name="sgfYtdValue"
              value={fundData.sgfYtdValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
            <input
              name="sgfYtdDate"
              value={fundData.sgfYtdDate}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">12M</p>
            <input
              name="sgf12mValue"
              value={fundData.sgf12mValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
            <input
              name="sgf12mDate"
              value={fundData.sgf12mDate}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="regularText text-neutral-mid">Benchmark</p>
            <input
              name="sgfBenchValue"
              value={fundData.sgfBenchValue}
              onChange={handleChange}
              placeholder=""
              type="text"
              className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit"
            />
          </div>
        </div>
      </div>
      <button className="primary-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FundYtdAdmin;
