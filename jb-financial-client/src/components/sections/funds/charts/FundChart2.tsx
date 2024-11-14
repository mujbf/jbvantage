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
          text: "Date",
          font: {
            size: 12,
            family: "Switzer-Semibold",
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
    <section className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col lg:flex-row gap-16">
      <div className="overflow-x-auto w-full lg:w-[60%]">
        <div className="flex flex-col justify-center gap-12 w-[200%] lg:w-full">
          {chartData && <Line data={chartData} options={chartOptions} />}
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex flex-col gap-4 md:gap-16 justify-center">
        <div>
          <h2 className="subtitleText text-primary-900" id="ytd-value-mmf">
            {ytdValue ? `${ytdValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md w-[80%]">
            7 Day Yield :{" "}
            <span className="text-neutral-light" id="ytd-date-mmf">
              as at {ytdDate ? ytdDate : "Loading..."}
            </span>
          </p>
        </div>
        <div>
          <h2 className="subtitleText text-primary-900">
            {twelveValue ? `${twelveValue}` : "Loading..."}
          </h2>
          <p className="text-base md:text-2xl text-neutral-dark switzer-md w-[80%]">
            12M Return :{" "}
            <span className="text-neutral-light">
              as at {twelveDate ? `${twelveDate}` : "Loading..."}
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

export default FundChart2;
