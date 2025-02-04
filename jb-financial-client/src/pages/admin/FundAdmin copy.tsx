import React, { useState } from "react";
import { Button, Label, TextInput, Table, Pagination } from "flowbite-react";

// FundCard Component
const FundCard: React.FC<{
  title: string;
  subtitle: string;
  buyPrice2?: boolean;
  fundData: {
    date: string;
    buyPrice1: number;
    buyPrice2?: number;
    sellPrice: number;
    nav: number;
  }[];
  onSubmit: (data: {
    date: string;
    buyPrice1: number;
    buyPrice2?: number;
    sellPrice: number;
    nav: number;
  }) => void;
}> = ({ title, subtitle, buyPrice2, fundData, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    buyPrice1: "",
    buyPrice2: "",
    sellPrice: "",
    nav: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sort data by date in descending order (newest first)
  const sortedData = [...fundData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === "date" ? value : Number(value) });

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        date: formData.date,
        buyPrice1: Number(formData.buyPrice1),
        buyPrice2: buyPrice2 ? Number(formData.buyPrice2) : undefined,
        sellPrice: Number(formData.sellPrice),
        nav: Number(formData.nav),
      });
    } else {
      console.log("Form validation failed");
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.buyPrice1) newErrors.buyPrice1 = "Buy Price 1 is required";
    if (buyPrice2 && !formData.buyPrice2)
      newErrors.buyPrice2 = "Buy Price 2 is required";
    if (!formData.sellPrice) newErrors.sellPrice = "Sell Price is required";
    if (formData.nav == null || formData.nav === "")
      newErrors.nav = "NAV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 gap-8 pb-8">
      <div className="flex flex-col py-8 rounded-t-2xl shadow-md w-full">
        <span className="bodyText text-neutral-light text-center">{title}</span>
        <span className="switzer-sb text-lg md:text-2xl text-primary-900 text-center">
          {subtitle}
        </span>

        {/* Data Table */}
        <div className="p-4 md:p-8">
          <div className="flex flex-col overflow-x-auto">
            <Table className="switzer-r min-w-full">
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>BP1</Table.HeadCell>
                {buyPrice2 && <Table.HeadCell>BP2</Table.HeadCell>}
                <Table.HeadCell>SP</Table.HeadCell>
                <Table.HeadCell>NAV</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentItems.map((data, index) => (
                  <Table.Row
                    key={index}
                    className={`${index === 0 ? "bg-neutral-lightest" : ""}`}
                  >
                    <Table.Cell className="table-cell-nowrap">
                      {formatDate(data.date)}
                    </Table.Cell>
                    <Table.Cell className="table-cell-nowrap">
                      {data.buyPrice1}
                    </Table.Cell>
                    {buyPrice2 && (
                      <Table.Cell className="table-cell-nowrap">
                        {data.buyPrice2}
                      </Table.Cell>
                    )}
                    <Table.Cell className="table-cell-nowrap">
                      {data.sellPrice}
                    </Table.Cell>
                    <Table.Cell className="table-cell-nowrap">
                      {data.nav}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 switzer-r text-sm">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  showIcons
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rest of the form remains unchanged */}
      <div className="p-4 md:p-8 flex flex-col gap-4">
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label htmlFor="date" value="Select Date" className="switzer-md" />
          </div>
          <input
            className={`switzer-r border rounded-md shadow-sm text-neutral-mid w-full ${
              errors.date ? "border-red-500" : "border-neutral-lighter"
            }`}
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="buyPrice1"
              value="Buy Price 1"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="buyPrice1"
            type="number"
            required
            shadow
            className={`switzer-r ${errors.buyPrice1 ? "border-red-500" : ""}`}
            value={formData.buyPrice1}
            onChange={handleChange}
          />
          {errors.buyPrice1 && (
            <p className="text-red-500 text-sm mt-1">{errors.buyPrice1}</p>
          )}
        </div>

        {buyPrice2 && (
          <div className="flex-grow">
            <div className="mb-2 block">
              <Label
                htmlFor="buyPrice2"
                value="Buy Price 2"
                className="switzer-md"
              />
            </div>
            <TextInput
              id="buyPrice2"
              type="number"
              required
              shadow
              className={`switzer-r ${
                errors.buyPrice2 ? "border-red-500" : ""
              }`}
              value={formData.buyPrice2}
              onChange={handleChange}
            />
            {errors.buyPrice2 && (
              <p className="text-red-500 text-sm mt-1">{errors.buyPrice2}</p>
            )}
          </div>
        )}

        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="sellPrice"
              value="Sell Price"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="sellPrice"
            type="number"
            required
            shadow
            className={`switzer-r ${errors.sellPrice ? "border-red-500" : ""}`}
            value={formData.sellPrice}
            onChange={handleChange}
          />
          {errors.sellPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.sellPrice}</p>
          )}
        </div>

        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="nav"
              value="Net Asset Value"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="nav"
            type="number"
            required
            shadow
            className={`switzer-r ${errors.nav ? "border-red-500" : ""}`}
            value={formData.nav}
            onChange={handleChange}
          />
          {errors.nav && (
            <p className="text-red-500 text-sm mt-1">{errors.nav}</p>
          )}
        </div>

        <Button className="primary-button-2" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FundCard;
