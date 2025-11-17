import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchModuleProps {
  placeholder?: string;
  popularSearches?: string[];
  onSearch?: (query: string) => void;
  onPopularSearchClick?: (search: string) => void;
}

export function SearchModule({ 
  placeholder = "Search for items, skins, or games...",
  popularSearches = [],
  onSearch,
  onPopularSearchClick
}: SearchModuleProps) {
  return (
    <div className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-3xl p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Title H3 20/28 */}
        <h3 className="text-text-primary dark:text-[#E5E7EB] text-center" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
          Find items to trade
        </h3>

        {/* Search Input 560-640×48 */}
        <div className="relative max-w-[640px] mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted dark:text-[#8B93A7] pointer-events-none" />
          <Input
            placeholder={placeholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-12 pl-12 pr-4 text-base bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937]
            placeholder:text-text-secondary dark:placeholder:text-[#A7B0BF] placeholder:font-medium
            focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 transition-all duration-200"
          />
        </div>

        {/* Chips - 2 rows, gap 8-12px */}
        {popularSearches.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-text-muted dark:text-[#8B93A7] text-center">
              Popular searches
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => onPopularSearchClick?.(search)}
                  className="px-4 py-2 rounded-full 
                  bg-[#FFF1F2] dark:bg-[#1F1315]
                  border border-[#FFE4E6] dark:border-[#4C1D24]
                  hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                  hover:bg-[#FFE4E6] dark:hover:bg-[#4C1D24]
                  text-text-secondary dark:text-[#A7B0BF]
                  hover:text-[#E11D48] dark:hover:text-[#F43F5E]
                  text-sm transition-all duration-200
                  focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

