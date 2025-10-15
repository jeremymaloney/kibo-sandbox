"use client";

import { useState } from "react";
import Image from "next/image";
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

interface ProductCardProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
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
  onFavourite?: (id: string, favourite: boolean) => void;
  onAddToCart?: (id: string) => void;
  onBuyNow?: (id: string) => void;
}

export default function ProductCard({
  id = "1",
  name = "Premium Wireless Headphones",
  description = "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
  price = 199.99,
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
  onFavourite = () => {
    alert("Favourite clicked. Implement favourite functionality here!");
  },
  onAddToCart = () => {
    alert("Add to cart clicked. Implement add to cart functionality here!");
  },
  onBuyNow = () => {
    alert("Buy now clicked. Implement buy now functionality here!");
  },
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(id);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    try {
      await onBuyNow(id);
    } finally {
      setIsBuyingNow(false);
    }
  };
  return (
    <Card
      className={cn(
        "mx-auto w-full max-w-sm overflow-hidden transition-all hover:shadow-lg",
        className
      )}
    >
      <article aria-label={`${name} product`}>
        <div className="relative h-60 bg-muted">
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
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
          {discount && (
            <Badge
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
              aria-label={`${discount}% discount available`}
            >
              {discount}% OFF
            </Badge>
          )}
          {!inStock && (
            <Badge
              className="absolute bottom-2 left-2 bg-gray-500"
              aria-label="Out of stock"
            >
              Out of Stock
            </Badge>
          )}
        </div>

        <CardHeader className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 flex-1 text-lg font-semibold">
              {name}
            </h3>
            {showFavourite && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onFavourite(id, !favourite)}
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
            className="mt-1 flex items-center gap-2"
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
                className="text-sm text-muted-foreground"
                aria-label={`${reviewCount} reviews`}
              >
                ({reviewCount})
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="text-lg font-bold text-primary"
              aria-label={`Current price ${formatPrice(price)}`}
            >
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span
                className="text-sm text-muted-foreground line-through"
                aria-label={`Original price ${formatPrice(originalPrice)}`}
              >
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>

        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button
            className="flex-1"
            onClick={handleBuyNow}
            disabled={!inStock || isBuyingNow}
            aria-label={`Buy ${name} now`}
          >
            {isBuyingNow ? "Processing..." : "Buy Now"}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!inStock || isAddingToCart}
            aria-label={`Add ${name} to cart`}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
}
