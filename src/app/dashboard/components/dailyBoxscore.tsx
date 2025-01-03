"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DailySummaryProps = {
  children: React.ReactNode;
  date: string | undefined;
};

const DailySummary = ({ children, date }: DailySummaryProps) => {
  console.log("date", date, new Date());
  const [selectedDate, setSelectedDate] = useState(
    date
      ? new Date(
          new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000,
        )
      : new Date(),
  );

  const router = useRouter();

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    router.push(
      `/dashboard?date=${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`,
    );
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    router.push(
      `/dashboard?date=${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`,
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevDay}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &lt;
        </button>
        <span className="min-w-32 text-center">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <button
          onClick={handleNextDay}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
      {children}
    </div>
  );
};

export default DailySummary;
