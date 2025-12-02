"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/star-rating";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface ProductCardProps {
  id?: string;
  name?: string;
  description?: string;
  fullDescription?: string;
  price?: number;
  salePrice?: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  imageAlt?: string;
  discount?: number;
  inStock?: boolean;
  showFavourite?: boolean;
  favourite?: boolean;
  className?: string;
  images?: string[];
  href?: string;
  onFavourite?: (id: string, favourite: boolean) => void;
  onAddToCart?: (id: string) => void;
  onBuyNow?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function ProductCard({
  id = "1",
  name = "Premium Wireless Headphones",
  description = "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
  fullDescription,
  price = 199.99,
  salePrice,
  originalPrice,
  currency = "USD",
  rating = 4.5,
  reviewCount,
  image = "/images/headphones.png",
  imageAlt,
  discount,
  inStock = true,
  showFavourite = false,
  favourite = false,
  className,
  images,
  href,
  onFavourite = () => {
    alert("Favourite clicked. Implement favourite functionality here!");
  },
  onAddToCart = () => {
    alert("Add to cart clicked. Implement add to cart functionality here!");
  },
  onBuyNow = () => {
    alert("Buy now clicked. Implement buy now functionality here!");
  },
  onClick,
}: ProductCardProps) {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsAddingToCart(true);
    try {
      onAddToCart(id);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsBuyingNow(true);
    try {
      onBuyNow(id);
    } finally {
      setIsBuyingNow(false);
    }
  };

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault(); // Prevent link navigation
    onFavourite(id, !favourite);
  };
  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const cardContent = (
    <Card
      className={cn(
        "mx-auto w-full max-w-sm overflow-hidden transition-all",
        href && "cursor-pointer",
        !href && onClick && "cursor-pointer",
        // Red theme: compact, minimal, dense
        theme === "red" && "shadow-sm hover:shadow-md hover:shadow-primary/30",
        // Blue theme: spacious, elevated, prominent
        theme === "blue" &&
          "shadow-md hover:shadow-xl hover:shadow-primary/40 border-2",
        className
      )}
      onClick={!href ? handleCardClick : undefined}
    >
      <article aria-label={`${name} product`}>
        <div
          className={cn(
            "relative bg-muted",
            // Red theme: smaller image, compact
            theme === "red" && "h-48",
            // Blue theme: larger image, spacious
            theme === "blue" && "h-72"
          )}
        >
          {!imageError ? (
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt || `${name} product image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <span className="text-theme-sm">Image unavailable</span>
            </div>
          )}
          {discount && (
            <Badge
              className={cn(
                "absolute bg-red-500 hover:bg-red-600",
                theme === "red" && "top-1 right-1 text-xs px-1.5 py-0.5",
                theme === "blue" && "top-3 right-3 text-sm px-3 py-1"
              )}
              aria-label={`${discount}% discount available`}
            >
              {discount}% OFF
            </Badge>
          )}
          {!inStock && (
            <Badge
              className={cn(
                "absolute bg-gray-500",
                theme === "red" && "bottom-1 left-1 text-xs px-1.5 py-0.5",
                theme === "blue" && "bottom-3 left-3 text-sm px-3 py-1"
              )}
              aria-label="Out of stock"
            >
              Out of Stock
            </Badge>
          )}
        </div>

        <CardHeader
          className={cn(theme === "red" && "p-3", theme === "blue" && "p-6")}
        >
          <div className="flex items-center justify-between gap-theme-sm">
            <h3
              className={cn(
                "line-clamp-1 flex-1 font-semibold",
                theme === "red" && "text-base",
                theme === "blue" && "text-xl"
              )}
            >
              {name}
            </h3>
            {showFavourite && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleFavouriteClick}
                aria-label={
                  favourite
                    ? `Remove ${name} from favorites`
                    : `Add ${name} to favorites`
                }
              >
                <Heart
                  className={favourite ? "fill-red-500 text-red-500" : ""}
                />
              </Button>
            )}
          </div>
          <div
            className={cn(
              "flex items-center gap-theme-sm",
              theme === "red" && "mt-1",
              theme === "blue" && "mt-3"
            )}
            aria-label={`${rating} out of 5 stars`}
          >
            <StarRating
              rating={rating}
              interactive={false}
              size="md"
              showInteractiveModeToggle={false}
              showRating={false}
            />
            {reviewCount && (
              <span
                className={cn(
                  "text-muted-foreground",
                  theme === "red" && "text-xs",
                  theme === "blue" && "text-base"
                )}
                aria-label={`${reviewCount} reviews`}
              >
                ({reviewCount})
              </span>
            )}
          </div>
          <div
            className={cn(
              "flex items-center gap-theme-sm flex-wrap",
              theme === "red" && "mt-1.5",
              theme === "blue" && "mt-4"
            )}
          >
            <span
              className={cn(
                "font-bold text-primary",
                theme === "red" && "text-base",
                theme === "blue" && "text-2xl"
              )}
              aria-label={`Current price ${formatPrice(salePrice || price)}`}
            >
              {formatPrice(salePrice || price)}
            </span>
            {originalPrice && originalPrice > (salePrice || price) && (
              <span
                className={cn(
                  "text-muted-foreground line-through",
                  theme === "red" && "text-xs",
                  theme === "blue" && "text-base"
                )}
                aria-label={`Original price ${formatPrice(originalPrice)}`}
              >
                {formatPrice(originalPrice)}
              </span>
            )}
            {salePrice && salePrice < price && (
              <Badge className="bg-highlight text-highlight-foreground hover:bg-highlight/90 text-xs font-bold">
                SALE
              </Badge>
            )}
          </div>
        </CardHeader>

        {/* Blue theme shows description, Red theme hides it for minimal look */}
        {theme === "blue" && (
          <CardContent className="px-6 pb-4">
            <p className="line-clamp-3 text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        )}

        <CardFooter
          className={cn(
            "flex gap-theme-sm",
            theme === "red" && "p-3 pt-0 flex-col",
            theme === "blue" && "p-6 pt-0 flex-row"
          )}
        >
          <Button
            className="flex-1 w-full"
            onClick={handleBuyNow}
            disabled={!inStock || isBuyingNow}
            aria-label={`Buy ${name} now`}
            size={theme === "red" ? "sm" : "default"}
          >
            {isBuyingNow ? "Processing..." : "Buy Now"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 w-full"
            onClick={handleAddToCart}
            disabled={!inStock || isAddingToCart}
            aria-label={`Add ${name} to cart`}
            size={theme === "red" ? "sm" : "default"}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </article>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

