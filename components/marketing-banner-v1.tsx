"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface MarketingBannerProps {
  title?: string;
  description?: string;
  badgeText?: string;
  imageUrl?: string;
}

export default function MarketingBannerV1({
  title = "Premium Audio",
  description = "Experience crystal-clear wireless audio with our flagship headphones. Now 40% off for a limited time.",
  badgeText = "Limited Time Offer",
  imageUrl = "/images/headphones.png",
}: MarketingBannerProps) {
  return (
    <Card className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border-none bg-gradient-to-r from-chart-2/80 to-primary/70 shadow-md">
      <div className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-10">
        <div className="flex flex-col gap-3 md:max-w-md">
          <Badge
            className="w-fit rounded-xl bg-foreground text-primary-foreground dark:bg-primary-foreground dark:text-primary"
            aria-label={badgeText}
          >
            {badgeText}
          </Badge>
          <h2 className="text-2xl leading-tight font-bold md:text-3xl">
            {title}
          </h2>
          <p className="text-sm md:text-base">{description}</p>
          <Button
            variant="secondary"
            className="mt-4 w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            aria-label="Buy Now"
          >
            Buy Now
          </Button>
        </div>
        <div className="w-full md:w-1/3">
          <Image
            src={imageUrl}
            alt="Product"
            width={300}
            height={300}
            className="h-auto w-full rounded-xl object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </Card>
  );
}
