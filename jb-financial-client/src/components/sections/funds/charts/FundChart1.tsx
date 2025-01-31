import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, ChartData, ChartOptions } from "chart.js";
import { SERVER_URL } from "../../../../Constants.tsx";

// Register all necessary components
Chart.register(...registerables);

interface FundChart1Props {
  mainTitle?: string;
  mainDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const FundChart1: React.FC<FundChart1Props> = ({}) => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [ytdReturn, setYtdReturn] = useState<number | null>(null);
  const [ytdDate, setYtdDate] = useState<number | null>(null);
  const [twelveMonthReturn, setTwelveMonthReturn] = useState<number | null>(
    null
  );
  const [twelveMonthDate, setTwelveMonthDate] = useState<number | null>(null);
  const [benchmarkValue, setBenchmarkValue] = useState<number | null>(null);

  const [year1, setYear1] = useState<number | null>(null);
  const [year2, setYear2] = useState<number | null>(null);
  const [year3, setYear3] = useState<number | null>(null);
  const [value1, setValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);
  const [value3, setValue3] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/export-json-value-equity`);
      const fundYTDDataResponse = await fetch(
        `${SERVER_URL}/api/fundYTDScheme-performance`
      );
      const rawData = await response.json();
      const fundYTDData = await fundYTDDataResponse.json();

      // Sort the data array by date
      const sortedData = rawData.data.sort((a: any, b: any) => {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime();
      });

      const labels = sortedData.map((item: any) => item.Date);
      const jbvefData = sortedData.map((item: any) => item.JBVEF);
      const spsl20triData = sortedData.map((item: any) => item.SPSL20TRI);
      const astriData = sortedData.map((item: any) => item.ASTRI);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "JBVEF",
            data: jbvefData,
            borderColor: "#930010",
            fill: false,
            pointRadius: 1,
            borderWidth: 2,
          },
          {
            label: "SPSL20TRI",
            data: spsl20triData,
            borderColor: "#444444",
            fill: false,
            pointRadius: 1,
            borderWidth: 2,
          },
          {
            label: "ASTRI",
            data: astriData,
            borderColor: "#AAAAAA",
            fill: false,
            pointRadius: 1,
            borderWidth: 2,
          },
        ],
      });
      setYtdReturn(fundYTDData.vefYtdValue);
      setYtdDate(fundYTDData.vefYtdDate);
      setTwelveMonthReturn(fundYTDData.vef12mValue);
      setTwelveMonthDate(fundYTDData.vef12mDate);
      setBenchmarkValue(fundYTDData.vefBenchValue);
      setYear1(fundYTDData.vefReturnYear1);
      setYear2(fundYTDData.vefReturnYear2);
      setYear3(fundYTDData.vefReturnYear3);
      setValue1(fundYTDData.vefReturnValue1);
      setValue2(fundYTDData.vefReturnValue2);
      setValue3(fundYTDData.vefReturnValue3);
    };

    fetchData();

    return () => {
      setChartData(null);
    };
  }, []);

  const chartOptions: ChartOptions<"line"> = {
    plugins: {
      title: {
        display: true,
        text: "Performance Since Inception",
        font: {
          size: 18,
          family: "Switzer-Semibold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            // Convert the date to the format "2024 Nov"
            const date = new Date(tooltipItems[0].label || "");
            return new Intl.DateTimeFormat("en", {
              year: "numeric",
              month: "short",
            }).format(date);
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "ⓘ Click on the legend above to isolate a data series",
          font: {
            size: 12,
            family: "Switzer-Regular",
          },
        },
        grid: {
          display: true,
          drawTicks: true,
          tickLength: 3,
          tickWidth: 5,
        },
        ticks: {
          maxTicksLimit: 200,
          callback: function (value) {
            if (!this.getLabelForValue) return "";
            const date = new Date(this.getLabelForValue(value as number));
            const startDate = new Date("2012-05-01");
            const endDate = new Date("2024-05-31");

            // Skip if date is outside our range
            if (date < startDate || date > endDate) return "";

            // Only show May (month 4) every two years
            if (
              date.getMonth() === 4 &&
              (date.getFullYear() - startDate.getFullYear()) % 2 === 0
            ) {
              return new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
              }).format(date);
            }
            return "";
          },
          autoSkip: false,
          maxRotation: 0, // Horizontal labels
          minRotation: 0, // Ensure labels stay horizontal
        },
      },
      y: {
        title: {
          display: true,
          text: "Return Percentage (%)",
          font: {
            size: 12,
            family: "Switzer-Semibold",
          },
        },
        grid: {
          display: true,
        },
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
  };

  return (
    <section className="bg-white px-4 py-8 md:px-8 md:py-200u lg:px-20 2xl:px-40 2xl:py-20 flex flex-col gap-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-8 w-full">
        <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 gap-4">
          <div className="flex flex-col px-4 pt-6">
            <span className="switzer-sb text-lg md:text-2xl neutralText text-center">
              {year1 !== null ? `${year1}` : "Loading..."}
            </span>
          </div>
          <div className="flex flex-col gap-6 px-4 pb-6">
            <p className="zodiak-r primaryText text-center text-5xl">
              {value1 !== null ? `${value1}` : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 gap-4">
          <div className="flex flex-col px-4 pt-6">
            <span className="switzer-sb text-lg md:text-2xl neutralText text-center">
              {year2 !== null ? `${year2}` : "Loading..."}
            </span>
          </div>
          <div className="flex flex-col gap-6 px-4 pb-6">
            <p className="zodiak-r primaryText text-center text-5xl">
              {value2 !== null ? `${value2}` : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 gap-4">
          <div className="flex flex-col px-4 pt-6">
            <span className="switzer-sb text-lg md:text-2xl neutralText text-center">
              {year3 !== null ? `${year3}` : "Loading..."}
            </span>
          </div>
          <div className="flex flex-col gap-6 px-4 pb-6">
            <p className="zodiak-r primaryText text-center text-5xl">
              {value3 !== null ? `${value3}` : "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="flex flex-col justify-center gap-12 w-[200%] lg:w-full">
          {chartData && (
            <Line data={chartData} options={chartOptions} className="" />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-16 justify-center">
        <div className="w-full">
          <h2 className="subtitleText text-primary-900" id="ytd-value">
            {ytdReturn !== null ? `${ytdReturn}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md">
            YTD Return :{" "}
            <span className="text-neutral-light">
              as at {ytdDate !== null ? `${ytdDate}` : "Loading..."}
            </span>
          </p>
        </div>
        <div className="w-full">
          <h2 className="subtitleText text-primary-900">
            {twelveMonthReturn !== null ? `${twelveMonthReturn}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md">
            12M Return :{" "}
            <span className="text-neutral-light">
              as at{" "}
              {twelveMonthDate !== null ? `${twelveMonthDate}` : "Loading..."}
            </span>
          </p>
        </div>
        <div className="w-full">
          <h2 className="subtitleText text-primary-900">
            {benchmarkValue !== null ? `${benchmarkValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md">
            Benchmark 12M Return
          </p>
        </div>
      </div>
    </section>
  );
};

export default FundChart1;
