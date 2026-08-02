"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const filters = [
  { name: "newest", value: "newest" },
  { name: "popular", value: "popular" },
  { name: "unanswered", value: "unanswered" },
  { name: "recommended", value: "recommended" },
];

export default function HomeFilter() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");

  const [activeFilter, setActiveFilter] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    if (filter) {
      setActiveFilter(filter);
    } else {
      setActiveFilter("");
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          onClick={() => handleTypeClick(filter.value)}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            activeFilter === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          key={filter.name}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}
