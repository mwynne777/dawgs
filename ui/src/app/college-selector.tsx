"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import type collegesService from "./(services)/colleges-service";
import { useRouter } from "next/navigation";

const CollegeSelector = ({
  colleges,
}: {
  colleges: Awaited<ReturnType<typeof collegesService.getColleges>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[230px] justify-between sm:w-72"
        >
          {value
            ? colleges.find((college) => college.name === value)?.name
            : "Select college..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0 sm:w-72">
        <Command>
          <CommandInput placeholder="Select college..." />
          <CommandList>
            <CommandEmpty>No college found.</CommandEmpty>
            <CommandGroup>
              {colleges.map((college) => (
                <CommandItem
                  key={college.code}
                  value={college.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(
                      `/where-are-they-now/${college.code.toUpperCase()}`,
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === college.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {college.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CollegeSelector;
