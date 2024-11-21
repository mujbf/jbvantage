import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, ChartData, ChartOptions } from "chart.js";
import { SERVER_URL } from "../../../../Constants.tsx";

// Register all necessary components
Chart.register(...registerables);

interface FundChart3Props {
  mainTitle?: string;
  mainDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const FundChart3: React.FC<FundChart3Props> = ({}) => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [ytdValue, setYtdValue] = useState<string | null>(null);
  const [ytdDate, setYtdDate] = useState<string | null>(null);
  const [twelveValue, setTwelveValue] = useState<string | null>(null);
  const [twelveDate, setTwelveDate] = useState<string | null>(null);
  const [benchmarkValue, setBenchmarkValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/export-json-short-term`);
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
      const jbgiltData = sortedData.map((item: any) => item.JBGILT);
      const ndibData = sortedData.map((item: any) => item.NDBIB);
      const tbillData = sortedData.map((item: any) => item.TBILL);

      // Set chart data
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "JBGILT",
            data: jbgiltData,
            borderColor: "#930010",
            backgroundColor: "rgba(147, 0, 16, 0.2)",
            fill: false,
            pointRadius: 1,
            borderWidth: 2,
          },
          {
            label: "NDBIB CRISIL 90 DAY",
            data: ndibData,
            borderColor: "#444444",
            backgroundColor: "rgba(68, 68, 68, 0.2)",
            fill: false,
            pointRadius: 1,
            borderWidth: 2,
          },
          {
            label: "T-BILL",
            data: tbillData,
            borderColor: "#AAAAAA",
            fill: false,
            pointRadius: 1,
            borderWidth: 2,
          },
        ],
      });

      // Set YTD return and date values
      setYtdValue(fundYTDData.sgfYtdValue);
      setYtdDate(fundYTDData.sgfYtdDate);
      setTwelveValue(fundYTDData.sgf12mValue);
      setTwelveDate(fundYTDData.sgf12mDate);
      setBenchmarkValue(fundYTDData.sgfBenchValue);
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
            family: "Switzer-Italic",
          },
        },
        grid: {
          display: false,
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
              date.getMonth() === 0 &&
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
          display: false,
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
            return tooltipItems[0].label || "";
          },
        },
      },
      title: {
        display: true,
        text: "Performance Since Inception",
        color: "#AAAAAA'",
        font: {
          size: 18,
          family: "Switzer-Regular",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <section className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col lg:flex-row gap-16">
      <div className="overflow-x-auto w-full lg:w-[60%]">
        <div className="flex flex-col justify-center gap-12 w-[200%] lg:w-full">
          {chartData && <Line data={chartData} options={chartOptions} />}
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex flex-col gap-4 md:gap-16 justify-center">
        <div>
          <h2 className="subtitleText text-primary-900" id="ytd-value-sgf">
            {ytdValue !== null ? `${ytdValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md w-[80%]">
            7 Day Yield :{" "}
            <span className="text-neutral-light" id="ytd-date-sgf">
              {ytdDate ? `as at ${ytdDate}` : "Loading..."}
            </span>
          </p>
        </div>
        <div>
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
        <div>
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

export default FundChart3;
