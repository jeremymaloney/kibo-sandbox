"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HPHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <div>
      <Link
        href={"/tariffs"}
        className="bg-bt-dark-blue text-white font-bold uppercase text-center p-1 w-full block hover:text-bt-yellow mb-4"
      >
        Navigating Tariffs: Important Updates and Resources
      </Link>

      <div className="grid grid-cols-1 gap-2 lg:flex xl:justify-between lg:gap-3">
        <div className="lg:h-full lg:w-full lg:min-w-[720px] lg:max-w-[820px]">
          {isMobile && (
            <Image
              src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-Spencer-Chair-Promo-mobile-1.jpg"
              alt="Mobile version image"
              width={375}
              height={200}
              priority
              className="w-full h-auto"
            />
          )}
          {isTablet && (
            <Image
              src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-Spencer-Chair-Promo-tablet-1.jpg"
              alt="Tablet version image"
              width={1002}
              height={270}
              priority
              className="w-full h-auto"
            />
          )}
          {!isTablet && !isMobile ? (
            <Image
              src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-Spencer-Chair-Promo-desktop-1.jpg"
              alt="Desktop version image"
              width={820}
              height={518}
              priority
              className="lg:h-full lg:w-full lg:object-cover"
            />
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3">
          <div>
            {isMobile && (
              <Image
                src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-Blitz-BD-IO-mobile-2.jpg"
                alt="Mobile version image"
                width={375}
                height={200}
                priority
                className="w-full h-auto"
              />
            )}
            {isTablet && (
              <Image
                src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-Blitz-BD-IO-tablet-2.jpg"
                alt="Tablet version image"
                width={488}
                height={230}
                priority
                className="w-full h-auto"
              />
            )}
            {!isTablet && !isMobile ? (
              <Image
                src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-Blitz-BD-IO-desktop-2.jpg"
                alt="Desktop version image"
                width={514}
                height={253}
                priority
                className="w-full h-auto max-w-[514px] xl:min-w-[418px]"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            {isMobile && (
              <Image
                src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-CPX-9590-Pulse-Ox-Promo-mobile-3.jpg"
                alt="Mobile version image"
                width={375}
                height={200}
                priority
                className="w-full h-auto"
              />
            )}
            {isTablet && (
              <Image
                src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-CPX-9590-Pulse-Ox-Promo-tablet-3.jpg"
                alt="Tablet version image"
                width={488}
                height={230}
                priority
                className="w-full h-auto"
              />
            )}
            {!isTablet && !isMobile ? (
              <Image
                src="https://cdn.boundtree.com/assets/btm/Home/Banners/homepage-banner-CPX-9590-Pulse-Ox-Promo-desktop-3.jpg"
                alt="Desktop version image"
                width={514}
                height={253}
                priority
                className="w-full h-auto max-w-[514px] xl:min-w-[418px]"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HPHero;
