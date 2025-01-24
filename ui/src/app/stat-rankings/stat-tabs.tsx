"use client";

import { useSearchParams } from "next/navigation";

const statOptions = [
  { id: "total_minutes", label: "Minutes" },
  { id: "total_points", label: "Points" },
  { id: "total_rebounds", label: "Rebounds" },
  { id: "total_assists", label: "Assists" },
];

const StatTabs = ({
  stat,
  setStat,
}: {
  stat: string;
  setStat: (stat: string) => void;
}) => {
  const searchParams = useSearchParams();

  const handleStatChange = (optionId: string) => {
    setStat(optionId);
    const params = new URLSearchParams(searchParams);
    params.set("stat", optionId);
    window.history.replaceState(
      null,
      "",
      `/stat-rankings?${params.toString()}`,
    );
  };

  return (
    <div className="mb-6">
      <div className="flex rounded-lg bg-gray-100 p-1">
        {statOptions.map((option) => (
          <button
            key={option.id}
            className={`relative flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-6 ${
              stat === option.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleStatChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatTabs;
