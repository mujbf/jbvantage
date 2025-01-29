import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, ChartData, ChartOptions } from "chart.js";
import { SERVER_URL } from "../../../../Constants.tsx";

// Register all necessary components
Chart.register(...registerables);

interface FundChart2Props {
  mainTitle?: string;
  mainDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const FundChart2: React.FC<FundChart2Props> = ({}) => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [ytdValue, setYtdValue] = useState<string | null>(null);
  const [ytdDate, setYtdDate] = useState<string | null>(null);
  const [twelveValue, setTwelveValue] = useState<string | null>(null);
  const [twelveDate, setTwelveDate] = useState<string | null>(null);
  const [benchmarkValue, setBenchmarkValue] = useState<number | null>(null);

  const [year1, setYear1] = useState<number | null>(null);
  const [year2, setYear2] = useState<number | null>(null);
  const [year3, setYear3] = useState<number | null>(null);
  const [value1, setValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);
  const [value3, setValue3] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the chart data
        const response = await fetch(`${SERVER_URL}/export-json-money-market`);
        const rawData = await response.json();

        // Sort the data array by date
        const sortedData = rawData.data.sort((a: any, b: any) => {
          return new Date(a.Date).getTime() - new Date(b.Date).getTime();
        });

        const labels = sortedData.map((item: any) => item.Date);
        const jbmmfData = sortedData.map((item: any) => item.JBMMF);
        const ndibData = sortedData.map((item: any) => item.NDBIB);
        const awfdrData = sortedData.map((item: any) => item.AWFDR);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "JBMMF",
              data: jbmmfData,
              borderColor: "#930010",
              fill: false,
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "NDBIB CRISIL 90 DAY T-BILL INDEX",
              data: ndibData,
              borderColor: "#444444",
              fill: false,
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "AWFDR",
              data: awfdrData,
              borderColor: "#AAAAAA",
              fill: false,
              pointRadius: 1,
              borderWidth: 2,
            },
          ],
        });

        // Fetch the YTD value from the API
        const ytdResponse = await fetch(
          `${SERVER_URL}/api/fundYTDScheme-performance`
        );
        const ytdData = await ytdResponse.json();
        setYtdValue(ytdData.mmfYtdValue);
        setYtdDate(ytdData.mmfYtdDate);
        setTwelveValue(ytdData.mmf12mValue);
        setTwelveDate(ytdData.mmf12mDate);
        setBenchmarkValue(ytdData.mmfBenchValue);
        setYear1(ytdData.mmfReturnYear1);
        setYear2(ytdData.mmfReturnYear2);
        setYear3(ytdData.mmfReturnYear3);
        setValue1(ytdData.mmfReturnValue1);
        setValue2(ytdData.mmfReturnValue2);
        setValue3(ytdData.mmfReturnValue3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      setChartData(null);
    };
  }, []);

  const chartOptions: ChartOptions<"line"> = {
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
            const startDate = new Date("2011-05-01");
            const endDate = new Date("2024-05-31");

            if (date < startDate || date > endDate) return "";

            if (
              date.getMonth() === 4 && // May
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
          maxRotation: 0,
          minRotation: 0,
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
    plugins: {
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
            {ytdValue !== null ? `${ytdValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md w-[80%]">
            YTD Return :{" "}
            <span className="text-neutral-light">
              as at {ytdDate !== null ? `${ytdDate}` : "Loading..."}
            </span>
          </p>
        </div>
        <div className="w-full">
          <h2 className="subtitleText text-primary-900">
            {twelveValue !== null ? `${twelveValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md w-[80%]">
            12M Return :{" "}
            <span className="text-neutral-light">
              as at {twelveDate !== null ? `${twelveDate}` : "Loading..."}
            </span>
          </p>
        </div>
        <div className="w-full">
          <h2 className="subtitleText text-primary-900">
            {benchmarkValue !== null ? `${benchmarkValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md w-[80%]">
            Benchmark 12M Return
          </p>
        </div>
      </div>
    </section>
  );
};

export default FundChart2;
