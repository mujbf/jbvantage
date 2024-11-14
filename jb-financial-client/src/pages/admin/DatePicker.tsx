import { useState } from "react";
import { Datepicker } from "flowbite-react";

interface DatePickerProps {
  onChange: (selectedDate: Date | null) => void;
}

export function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();

  const handleDateChange: DatePickerProps["onChange"] = (selected) => {
    setSelectedDate(selected);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Datepicker
        onSelectedDateChanged={handleDateChange}
        maxDate={today} // Restrict selection to today or earlier
      />

      <div className="mt-4 p-2 text-neutral-mid switzer-md">
        Your selected date is:{" "}
        {selectedDate ? selectedDate.toLocaleDateString() : "No date selected"}
      </div>
    </div>
  );
}

export default DatePicker;
