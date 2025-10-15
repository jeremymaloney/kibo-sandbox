"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StarRatingProps {
  rating?: number;
  outOf?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  showRating?: boolean;
  showInteractiveModeToggle?: boolean; // Only for demo purposes, can be removed in production
  color?: string;
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({
  rating = 4.5,
  outOf = 5,
  className,
  size = "lg",
  interactive = false,
  showRating = true,
  showInteractiveModeToggle = false, // Only for demo purposes, can be removed in production
  color,
  onRatingChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [selectedRating, setSelectedRating] = React.useState<number>(rating);
  const [isInteractive, setIsInteractive] =
    React.useState<boolean>(interactive);

  const sizeClasses = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };
  const starColors = color
    ? { text: `text-${color}`, fill: `fill-${color}` }
    : { text: "text-primary", fill: "fill-primary" };
  const currentRating = hoverRating ?? selectedRating;
  const filledStars = Math.floor(currentRating);

  const handleInteraction = (
    index: number,
    event: React.MouseEvent,
    isClick = false
  ) => {
    if (!isInteractive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const newRating =
      event.clientX - rect.left < rect.width / 2 ? index + 0.5 : index + 1;
    if (isClick) {
      setSelectedRating(newRating);
      onRatingChange?.(newRating);
    } else {
      setHoverRating(newRating);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-0.5"
          onMouseLeave={() => isInteractive && setHoverRating(null)}
        >
          {Array.from({ length: outOf }, (_, i) => {
            const isFilled = i < filledStars;
            const isHalf = i === filledStars && currentRating % 1 >= 0.5;

            return isHalf ? (
              <div
                key={i}
                className={cn(
                  "relative",
                  sizeClasses[size],
                  isInteractive &&
                    "cursor-pointer transition-transform hover:scale-110"
                )}
                onClick={(e) => handleInteraction(i, e, true)}
                onMouseMove={(e) => handleInteraction(i, e)}
              >
                <Star
                  className={cn(
                    "absolute text-muted-foreground",
                    sizeClasses[size]
                  )}
                />
                <Star
                  className={cn(
                    "absolute",
                    starColors.fill,
                    starColors.text,
                    sizeClasses[size]
                  )}
                  style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                />
              </div>
            ) : (
              <Star
                key={i}
                className={cn(sizeClasses[size], {
                  [starColors.fill]: isFilled,
                  [starColors.text]: isFilled,
                  "text-muted-foreground": !isFilled,
                  "cursor-pointer transition-transform hover:scale-110":
                    isInteractive,
                })}
                onClick={(e) => handleInteraction(i, e, true)}
                onMouseMove={(e) => handleInteraction(i, e)}
              />
            );
          })}
        </div>
        {showRating && (
          <span className="text-sm text-muted-foreground">
            {currentRating.toFixed(1)}
          </span>
        )}
      </div>
      {/* Only for demo purposes, can be removed in production! */}
      {showInteractiveModeToggle && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsInteractive(!isInteractive);
            setHoverRating(null);
          }}
          className="mt-4 w-fit"
        >
          {isInteractive ? "Disable" : "Enable"} Interactive Mode
        </Button>
      )}
    </div>
  );
}
