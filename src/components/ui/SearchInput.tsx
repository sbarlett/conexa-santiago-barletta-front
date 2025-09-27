"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  value?: string;
}

export default function SearchInput({ placeholder = "Buscar...", onSearch, className = "", value: controlledValue }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState<string>("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onSearch(newValue);
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue("");
    }
    onSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full pl-10 pr-10 py-2.5 
             bg-transparent dark:bg-transparent
             border border-sage-200/50 dark:border-sage-700/50 
             rounded-xl 
             text-neutral-800 dark:text-neutral-200 
             placeholder-sage-400 dark:placeholder-sage-500
             focus:outline-none focus:ring-2 focus:ring-sage-300/50 dark:focus:ring-sage-600/50 
             focus:border-sage-300 dark:focus:border-sage-600
             transition-all duration-200 ease-in-out
             hover:bg-transparent dark:hover:bg-transparent 
             hover:border-sage-300/70 dark:hover:border-sage-600/70"
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       h-5 w-5 transition-all duration-200 ease-in-out"
          >
            <X />
          </button>
        )}
      </div>
    </div>
  );
}
