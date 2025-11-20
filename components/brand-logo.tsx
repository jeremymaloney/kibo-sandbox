"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Hexagon } from "lucide-react";
import { type BrandLogoProps } from "./types";

export const BrandLogo = React.memo<BrandLogoProps>(
  ({ brandLogo, brandLogoAlt = "Brand logo", onBrandClick }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (onBrandClick) {
        e.preventDefault();
        onBrandClick();
      }
    };

    return (
      <Link
        href="/"
        onClick={handleClick}
        className="flex cursor-pointer touch-manipulation items-center gap-2 rounded-md transition-transform focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none active:scale-95"
        aria-label={brandLogoAlt || "Go to homepage"}
      >
        {brandLogo ? (
          <Image
            src={brandLogo}
            alt={brandLogoAlt}
            width={40}
            height={40}
            className="h-8 w-auto md:h-10"
            priority
          />
        ) : (
          <>
            <Hexagon className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-base font-semibold text-foreground md:text-lg">
              TechStore
            </span>
          </>
        )}
      </Link>
    );
  }
);

BrandLogo.displayName = "BrandLogo";
