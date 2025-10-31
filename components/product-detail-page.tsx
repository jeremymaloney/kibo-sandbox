"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/star-rating";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface ProductDetailPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
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
    images?: string[];
    stockAvailable?: number;
    productCode?: string;
  };
  onAddToCart?: (id: string, quantity: number) => void;
  onBuyNow?: (id: string, quantity: number) => void;
  onFavourite?: (id: string, favourite: boolean) => void;
}

export default function ProductDetailPage({
  open,
  onOpenChange,
  product,
  onAddToCart = () => {},
  onBuyNow = () => {},
  onFavourite = () => {},
}: ProductDetailPageProps) {
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const images = product.images || [product.image];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.currency || "USD",
    }).format(amount);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(product.id || "", quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    try {
      await onBuyNow(product.id || "", quantity);
    } finally {
      setIsBuyingNow(false);
    }
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    onFavourite(product.id || "", !isFavourite);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "!max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto sm:!max-w-5xl",
          theme === "red" && "p-4",
          theme === "blue" && "p-8"
        )}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className={cn("grid gap-theme-lg md:grid-cols-2")}>
          {/* Image Gallery */}
          <div className={cn("md:col-span-1")}>
            {/* Main Image */}
            <div
              className={cn(
                "relative bg-muted rounded-theme-radius overflow-hidden mb-theme-md",
                theme === "red" && "h-64 md:h-96",
                theme === "blue" && "h-80 md:h-[500px]"
              )}
            >
              {!imageError ? (
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.imageAlt || `${product.name} image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  <span className="text-theme-base">Image unavailable</span>
                </div>
              )}

              {product.discount && (
                <Badge
                  className={cn(
                    "absolute bg-red-500 hover:bg-red-600",
                    theme === "red" && "top-2 right-2 text-xs px-2 py-1",
                    theme === "blue" && "top-4 right-4 text-base px-4 py-2"
                  )}
                >
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-theme-sm overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "relative flex-shrink-0 rounded-theme-radius overflow-hidden border-2 transition-all",
                      theme === "red" && "w-16 h-16",
                      theme === "blue" && "w-20 h-20",
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className={cn("md:col-span-1")}>
            {/* Product Name */}
            <h1
              className={cn(
                "font-bold mb-theme-sm",
                theme === "red" && "text-xl",
                theme === "blue" && "text-3xl"
              )}
            >
              {product.name}
            </h1>

            {/* Product Code/SKU */}
            {product.productCode && (
              <div className="mb-theme-sm">
                <span
                  className={cn(
                    "text-muted-foreground font-mono",
                    theme === "red" && "text-xs",
                    theme === "blue" && "text-sm"
                  )}
                >
                  SKU: {product.productCode}
                </span>
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center gap-theme-sm mb-theme-md">
              <StarRating
                rating={product.rating || 0}
                interactive={false}
                size="md"
                showInteractiveModeToggle={false}
                showRating={false}
              />
              {product.reviewCount && (
                <span
                  className={cn(
                    "text-muted-foreground",
                    theme === "red" && "text-sm",
                    theme === "blue" && "text-base"
                  )}
                >
                  ({product.reviewCount} reviews)
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-theme-md">
              <div className="flex items-center gap-theme-sm flex-wrap">
                <span
                  className={cn(
                    "font-bold text-primary",
                    theme === "red" && "text-2xl",
                    theme === "blue" && "text-4xl"
                  )}
                >
                  {formatPrice(product.salePrice || product.price || 0)}
                </span>
                {product.originalPrice &&
                  product.originalPrice >
                    (product.salePrice || product.price || 0) && (
                    <span
                      className={cn(
                        "text-muted-foreground line-through",
                        theme === "red" && "text-base",
                        theme === "blue" && "text-xl"
                      )}
                    >
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                {product.salePrice &&
                  product.salePrice < (product.price || 0) && (
                    <Badge className="bg-highlight text-highlight-foreground hover:bg-highlight/90 font-bold">
                      ON SALE
                    </Badge>
                  )}
              </div>
              {product.salePrice &&
                product.salePrice < (product.price || 0) && (
                  <p
                    className={cn(
                      "text-muted-foreground mt-1",
                      theme === "red" && "text-xs",
                      theme === "blue" && "text-sm"
                    )}
                  >
                    Regular price: {formatPrice(product.price || 0)}
                  </p>
                )}
            </div>

            {/* Stock Status */}
            <div className="mb-theme-lg">
              <div className="flex items-center gap-2 flex-wrap">
                {product.inStock ? (
                  <>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      In Stock
                    </Badge>
                    {product.stockAvailable !== undefined &&
                      product.stockAvailable > 0 &&
                      product.stockAvailable <= 10 && (
                        <span
                          className={cn(
                            "text-orange-600 font-semibold",
                            theme === "red" && "text-xs",
                            theme === "blue" && "text-sm"
                          )}
                        >
                          Only {product.stockAvailable} left!
                        </span>
                      )}
                  </>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div
              className={cn(
                "mb-theme-lg",
                theme === "red" && "mt-4",
                theme === "blue" && "mt-6"
              )}
            >
              <h2
                className={cn(
                  "font-semibold mb-theme-sm",
                  theme === "red" && "text-base",
                  theme === "blue" && "text-xl"
                )}
              >
                Description
              </h2>
              <p
                className={cn(
                  "text-muted-foreground",
                  theme === "red" && "text-sm leading-relaxed",
                  theme === "blue" && "text-base leading-loose"
                )}
              >
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div
              className={cn(
                "mb-theme-lg",
                theme === "red" && "mt-4",
                theme === "blue" && "mt-6"
              )}
            >
              <label
                className={cn(
                  "block font-semibold mb-theme-sm",
                  theme === "red" && "text-sm",
                  theme === "blue" && "text-base"
                )}
              >
                Quantity
              </label>
              <div className="flex items-center gap-theme-sm">
                <Button
                  variant="outline"
                  size={theme === "red" ? "sm" : "default"}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span
                  className={cn(
                    "min-w-12 text-center font-semibold",
                    theme === "red" && "text-base",
                    theme === "blue" && "text-xl"
                  )}
                >
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size={theme === "red" ? "sm" : "default"}
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={cn(
                "flex flex-col gap-theme-sm mb-theme-md",
                theme === "red" && "mt-6",
                theme === "blue" && "mt-8"
              )}
            >
              <Button
                className="w-full"
                onClick={handleBuyNow}
                disabled={!product.inStock || isBuyingNow}
                size={theme === "red" ? "default" : "lg"}
              >
                {isBuyingNow ? "Processing..." : "Buy Now"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                size={theme === "red" ? "default" : "lg"}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleFavourite}
                size={theme === "red" ? "default" : "lg"}
              >
                <Heart
                  className={cn(
                    "mr-2 h-4 w-4",
                    isFavourite && "fill-red-500 text-red-500"
                  )}
                />
                {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
