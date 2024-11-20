import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../Constants.tsx";

interface PerformanceData {
  _id: string;
  Date: string;
  [key: string]: string | number;
}

interface PerformanceTableProps {
  chartType: "value-eq" | "short-term" | "money-market";
  cardTitle: string;
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  chartType,
  cardTitle,
}) => {
  const [data, setData] = useState<PerformanceData[]>([]);
  const [newEntry, setNewEntry] = useState<PerformanceData>({
    _id: "",
    Date: "",
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [chartType]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/performance-${chartType}`
      );
      const sortedData = response.data.sort(
        (a: PerformanceData, b: PerformanceData) => {
          return new Date(b.Date).getTime() - new Date(a.Date).getTime();
        }
      );
      setData(sortedData.slice(0, 5));
      if (sortedData.length > 0) {
        const initialEntry = Object.keys(sortedData[0]).reduce(
          (acc, key) => {
            if (key !== "_id" && key !== "Date" && key !== "__v") {
              acc[key] = "";
            }
            return acc;
          },
          { _id: "", Date: "" } as PerformanceData
        );

        setNewEntry(initialEntry);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "Date") {
      const existingEntry = data.find((entry) => entry.Date === value);
      if (existingEntry) {
        setNewEntry(existingEntry);
        setIsUpdating(true);
      } else {
        setNewEntry((prev) => ({
          ...Object.keys(prev).reduce((acc, key) => {
            if (key !== "_id" && key !== "Date" && key !== "__v") {
              acc[key] = "";
            }
            return acc;
          }, {} as PerformanceData),
          Date: value,
        }));
        setIsUpdating(false);
      }
    } else {
      setNewEntry((prevEntry) => ({
        ...prevEntry,
        [name]: value,
      }));
    }

    console.log("Current newEntry state:", { ...newEntry, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entryToSend: Partial<PerformanceData> = { ...newEntry };
      delete entryToSend._id;

      console.log("Submitting entry:", entryToSend);

      if (isUpdating) {
        await axios.put(
          `${SERVER_URL}/api/performance-${chartType}/${newEntry._id}`,
          entryToSend
        );
      } else {
        await axios.post(
          `${SERVER_URL}/api/performance-${chartType}`,
          entryToSend
        );
      }

      await fetchData();

      const newEmptyEntry: PerformanceData = {
        _id: "",
        Date: "",
        ...Object.keys(data[0] || {}).reduce((acc, key) => {
          if (key !== "_id" && key !== "Date" && key !== "__v") {
            acc[key] = "";
          }
          return acc;
        }, {} as Omit<PerformanceData, "_id" | "Date">),
      };

      setNewEntry(newEmptyEntry);
      setIsUpdating(false);
    } catch (error) {
      console.error("Error adding/updating entry:", error);
    }
  };

  // New delete function
  const handleDelete = async () => {
    if (!isUpdating || !newEntry._id) {
      alert("Please select an entry to delete");
      return;
    }

    // Map chartType to correct endpoint path
    const endpointMap = {
      "value-eq": "value-equity-fund",
      "money-market": "money-market-fund",
      "short-term": "short-term-gilt-fund",
    };

    try {
      await axios.delete(
        `${SERVER_URL}/funds/${endpointMap[chartType]}/${newEntry._id}`
      );

      await fetchData();

      const newEmptyEntry: PerformanceData = {
        _id: "",
        Date: "",
        ...Object.keys(data[0] || {}).reduce((acc, key) => {
          if (key !== "_id" && key !== "Date" && key !== "__v") {
            acc[key] = "";
          }
          return acc;
        }, {} as Omit<PerformanceData, "_id" | "Date">),
      };

      setNewEntry(newEmptyEntry);
      setIsUpdating(false);
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry");
    }
  };

  const renderTable = () => (
    <div className="px-4 md:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 switzer-r text-neutral-mid">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              {data.length > 0 &&
                Object.keys(data[0])
                  .filter(
                    (key) => key !== "_id" && key !== "Date" && key !== "__v"
                  )
                  .map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {key}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {entry.Date}
                </td>
                {Object.entries(entry)
                  .filter(
                    ([key]) => key !== "_id" && key !== "Date" && key !== "__v"
                  )
                  .map(([key, value]) => (
                    <td key={key} className="border border-gray-300 px-4 py-2">
                      {value}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="px-4 md:px-8 flex flex-col gap-4">
      <input
        className="switzer-r border border-neutral-lighter rounded-md shadow-sm text-neutral-mid"
        type="date"
        name="Date"
        value={newEntry.Date}
        onChange={handleInputChange}
        required
      />
      {data.length > 0 &&
        Object.keys(data[0])
          .filter((key) => key !== "_id" && key !== "Date" && key !== "__v")
          .map((key) => (
            <input
              className="switzer-r border border-neutral-lighter rounded-md shadow-sm text-neutral-mid"
              key={key}
              type="number"
              name={key}
              placeholder={key}
              value={newEntry[key] as string}
              onChange={handleInputChange}
              required
            />
          ))}
      <button type="submit" className="primary-button">
        {isUpdating ? "Update Entry" : "Add Entry"}
      </button>
      <button type="button" onClick={handleDelete} className="secondary-button">
        Delete Entry
      </button>
    </form>
  );

  return (
    <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 gap-8 pb-8">
      <div className="flex flex-col py-8 rounded-t-2xl shadow-md w-full">
        <span className="bodyText text-neutral-light text-center">
          JB Vantage
        </span>
        <span className="switzer-sb text-lg md:text-2xl text-primary-900 text-center">
          {cardTitle}
        </span>
      </div>
      {renderTable()}
      <h3 className="switzer-sb text-neutral-dark px-4 md:px-8">
        {isUpdating ? "Update Entry" : "Add New Entry"}
      </h3>
      {renderForm()}
    </div>
  );
};

export default PerformanceTable;
