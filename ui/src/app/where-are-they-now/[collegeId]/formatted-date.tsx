"use client";

const FormattedDate = ({ date }: { date: string }) => {
  const d = new Date(date);
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const year = String(d.getUTCFullYear()).slice(-2);
  const formattedDate = `${month}/${day}/${year}`;
  return <span className="text-sm text-gray-500">{formattedDate}</span>;
};

export default FormattedDate;
