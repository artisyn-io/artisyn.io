import { Search } from "lucide-react";
import { useState } from "react";

type ArtisanSearchProps = {
  onSearch: (term: string) => void;
};
export function ArtisanSearch({ onSearch }: ArtisanSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };
  return (
    <div className="relative h-11.25 text-base w-full">
      <Search className="absolute left-4 top-4.25 size-4 text-[#262626]" />
      <input
        value={inputValue}
        onChange={handleChange}
        className="block pl-12 w-full border-[#E2E8F0] border rounded-xl bg-white pr-3 py-3 text-[#020817] outline-1 -outline-offset-1 outline-white/10 placeholder:text-[#929090] focus:outline-2 focus:-outline-offset-2 focus:outline-[#605DEC] "
        type="text"
        placeholder="Search for an artisan"
      />
    </div>
  );
}
