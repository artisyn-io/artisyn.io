import { SuggestionsDropdown } from "@/components/search/suggestions-dropdown";
import { Search } from "lucide-react";
import { useState } from "react";

type ArtisanSearchProps = {
  onSearch: (term: string) => void;
};
export function ArtisanSearch({ onSearch }: ArtisanSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const updateSearch = (value: string) => {
    setInputValue(value);
    onSearch(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  return (
    <SuggestionsDropdown
      className="relative h-11.25 text-base w-full"
      onSelect={updateSearch}
      query={inputValue}
    >
      {({
        activeDescendantId,
        isExpanded,
        listboxId,
        onBlur,
        onFocus,
        onKeyDown,
      }) => (
        <>
          <Search className="absolute left-4 top-4.25 size-4 text-[#262626]" />
          <input
            aria-activedescendant={activeDescendantId}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isExpanded}
            autoComplete="off"
            className="block pl-12 w-full border-[#E2E8F0] border rounded-xl bg-white pr-3 py-3 text-[#020817] outline-1 -outline-offset-1 outline-white/10 placeholder:text-[#929090] focus:outline-2 focus:-outline-offset-2 focus:outline-[#605DEC]"
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder="Search for an artisan"
            role="combobox"
            type="text"
            value={inputValue}
          />
        </>
      )}
    </SuggestionsDropdown>
  );
}
