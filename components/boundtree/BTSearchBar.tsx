"use client";

import * as React from "react";
// import { useRouter } from "next/navigation"; // Uncomment if you need routing
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, Search, X as CloseIcon, Info } from "lucide-react";

interface SearchResult {
  //   value: string;
  //   label: string;
  //   group: string;
  productCode: string;
  content: {
    productName: string;
  };
  purchasableState: {
    isPurchasable: boolean;
  };
  isActive: boolean;
  inventoryInfo: {
    onlineStockAvailable?: number;
  };
}

export interface SearchBarProps {
  className?: string;
  hintText?: string;
}

/**
 * A custom hook to debounce a value.
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// --- Mock API for Demo ---
// const mockSearchAPI = async (query: string): Promise<SearchResult[]> => {
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 300));

//   if (!query) return [];
//   const mockResults: SearchResult[] = [
//     // Computers & Laptops
//     { value: "macbook-pro-m3", label: "MacBook Pro M3", group: "Laptops" },
//     {
//       value: "gaming-laptop-asus",
//       label: "ASUS Gaming Laptop",
//       group: "Laptops",
//     },
//     { value: "dell-xps-13", label: "Dell XPS 13", group: "Laptops" },

//     // Mobile & Accessories
//     { value: "iphone-15-pro", label: "iPhone 15 Pro", group: "Smartphones" },
//     {
//       value: "samsung-galaxy-s24",
//       label: "Samsung Galaxy S24",
//       group: "Smartphones",
//     },
//     { value: "ipad-air", label: "iPad Air", group: "Tablets" },

//     // Audio & Video
//     { value: "airpods-pro", label: "AirPods Pro", group: "Audio" },
//     { value: "sony-wh1000xm5", label: "Sony WH-1000XM5", group: "Audio" },
//     { value: "bose-quietcomfort", label: "Bose QuietComfort", group: "Audio" },

//     // Gaming
//     { value: "ps5-console", label: "PlayStation 5", group: "Gaming" },
//     { value: "xbox-series-x", label: "Xbox Series X", group: "Gaming" },
//     {
//       value: "nintendo-switch-oled",
//       label: "Nintendo Switch OLED",
//       group: "Gaming",
//     },

//     // Categories
//     { value: "laptops", label: "All Laptops", group: "Categories" },
//     { value: "smartphones", label: "All Smartphones", group: "Categories" },
//     { value: "headphones", label: "All Headphones", group: "Categories" },
//     { value: "gaming-consoles", label: "Gaming Consoles", group: "Categories" },
//   ];

//   return mockResults.filter(
//     (item) =>
//       item.label.toLowerCase().includes(query.toLowerCase()) ||
//       item.group.toLowerCase().includes(query.toLowerCase())
//   );
// };

// --- Kibo API ---
const kiboSearchAPI = async (query: string): Promise<SearchResult[]> => {
  if (!query) return [];

  try {
    const response = await fetch(`/api/search-products/?query=${query}`);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Error with Search API data" }));
      console.error("Search API error:", errorData);
      throw new Error(errorData.error || "Failed to search products");
    }

    const products = await response.json();
    console.log("search bar products:", products);

    // Ensure we return an array
    if (!Array.isArray(products)) {
      console.error("Expected array but got:", typeof products, products);
      return [];
    }

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

// Main SearchBar Component
export default function BTSearchBar({
  className,
  hintText = "Search for laptops, smartphones, headphones, and more...",
}: SearchBarProps) {
  // const router = useRouter(); // Uncomment if you need routing
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setError(null);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const data = await mockSearchAPI(debouncedQuery);
        const data = await kiboSearchAPI(debouncedQuery);
        setResults(data);
      } catch {
        setError("Failed to search products. Please try again.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedQuery]);

  const handleSelect = (value: string) => {
    // TODO: Implement your navigation logic here
    // Example: router.push(`/products/${value}`);
    console.log(`Navigate to product: ${value}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      // TODO: Implement global search navigation
      // Example: router.push(`/search?q=${encodeURIComponent(query)}`);
      console.log(`Search for: ${query}`);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full max-w-sm justify-start text-muted-foreground transition-colors hover:text-foreground",
            className
          )}
          aria-label="Open search"
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="text-muted-foreground/50">
            Search our products...
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command shouldFilter={false}>
          <div className="relative">
            <CommandInput
              value={query}
              onValueChange={setQuery}
              onKeyDown={handleKeyDown}
              placeholder="Search products or categories..."
              className="pr-10"
              aria-label="Search for products"
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleClear}
                    aria-label="Clear search"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </Button>
                )
              )}
            </div>
          </div>
          <CommandList>
            {error ? (
              <div className="p-4 text-center text-sm text-destructive">
                {error}
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {query ? "No products found." : "Start typing to search..."}
                </CommandEmpty>
                {results.length > 0 && (
                  <CommandGroup className="p-2">
                    {results.map((item) => (
                      <CommandItem
                        key={item.productCode}
                        value={item.productCode}
                        onSelect={handleSelect}
                        className="flex cursor-pointer items-center justify-between"
                      >
                        <span>{item.productCode}</span>
                        <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                          {item.content.productName}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
        {hintText && (
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center justify-center border-t p-2">
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{hintText}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        )}
      </PopoverContent>
    </Popover>
  );
}
