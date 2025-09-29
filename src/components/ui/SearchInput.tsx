import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchInput({ placeholder = "Buscar personajes...", onSearch, value }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onSearch("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors hover:border-ring/60"
      />
      {inputValue && (
        <button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-accent transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
