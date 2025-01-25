"use client";
import { useState } from "react";
import type collegesService from "./(services)/colleges-service";
import { useRouter } from "next/navigation";

const ClientComponent = ({
  colleges,
}: {
  colleges: Awaited<ReturnType<typeof collegesService.getColleges>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const filteredColleges = colleges
    .filter((college) =>
      college.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .slice(0, 5); // Limit to 5 suggestions

  return (
    <div className="relative w-full md:w-[500px] lg:w-[600px]">
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 bg-white p-4 text-black md:w-[500px] lg:w-[600px]"
        placeholder="Enter a college name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      {showSuggestions && inputValue && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          {filteredColleges.map((college) => (
            <li
              key={college.id}
              className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => {
                setInputValue(college.name);
                setShowSuggestions(false);
                router.push(`/where-are-they-now/${college.id}`);
              }}
            >
              {college.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientComponent;
