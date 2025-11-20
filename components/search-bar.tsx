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
import ProductDetailPage from "@/components/product-detail-page";
import {
  transformKiboProduct,
  type KiboProduct,
  type TransformedProduct,
} from "@/utils/product-transformer";

interface SearchResult {
  value: string;
  label: string;
  group: string;
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

/**
 * Search products using Kibo Product Search API
 */
const searchProductsAPI = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.trim() === "") return [];

  try {
    const response = await fetch(
      `/api/product-search?q=${encodeURIComponent(query)}&pageSize=10`
    );

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    const data = await response.json();
    const products: KiboProduct[] = data.data || [];

    // Transform Kibo products to SearchResult format
    return products.map((product) => ({
      value: product.productCode,
      label: product.content?.productName || product.productCode,
      group: product.productType || "Products",
    }));
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Main SearchBar Component
export default function SearchBar({
  className,
  hintText = "Search for aed, masks, gloves, and more...",
}: SearchBarProps) {
  // const router = useRouter(); // Uncomment if you need routing
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    React.useState<TransformedProduct | null>(null);
  const [isPdpOpen, setIsPdpOpen] = React.useState(false);

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
        const data = await searchProductsAPI(debouncedQuery);
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

  const handleSelect = async (productCode: string) => {
    try {
      // Fetch specific product by product code
      const response = await fetch(
        `/api/product/${encodeURIComponent(productCode)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();

      if (data.data) {
        // Transform Kibo product data to PDP format using shared utility
        const transformedProduct = transformKiboProduct(data.data);
        setSelectedProduct(transformedProduct);
        setIsPdpOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details. Please try again.");
    } finally {
      setIsOpen(false);
      setQuery("");
    }
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
    <>
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
                aria-label="Search for tech products"
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
                    <CommandGroup>
                      {results.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={handleSelect}
                          className="flex cursor-pointer items-center justify-between"
                        >
                          <span>{item.label}</span>
                          <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                            {item.group}
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

      {/* Product Detail Page Modal */}
      {selectedProduct && (
        <ProductDetailPage
          open={isPdpOpen}
          onOpenChange={setIsPdpOpen}
          product={selectedProduct}
        />
      )}
    </>
  );
}
