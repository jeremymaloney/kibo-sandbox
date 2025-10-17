"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  type ContentColumn,
  type LinkItem,
  type CallToAction,
} from "./mega-menu.data";

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & LinkItem
>(({ className, title, children, href = "#", ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        href={href}
        className={cn(
          "block touch-manipulation rounded-md py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 md:py-2",
          children && "pb-3",
          className
        )}
        aria-label={children ? `${title}: ${children}` : title}
        {...props}
      >
        <div className="flex items-center gap-2 font-medium">{title}</div>
        {children && (
          <p className="mt-1 text-sm leading-snug text-muted-foreground/80">
            {children}
          </p>
        )}
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

export const MenuColumn = React.memo<{
  column: ContentColumn;
  handleLinkClick: (
    href: string,
    title: string
  ) => (e: React.MouseEvent) => void;
}>(({ column, handleLinkClick }) => (
  <div
    className="w-auto px-4 py-4 md:px-6"
    role="group"
    aria-label={column.title || "Menu section"}
  >
    {column.title && column.href ? (
      <ListItem
        href={column.href}
        title={column.title}
        onClick={handleLinkClick(column.href, column.title)}
        className="mb-3 block border-b border-border/30 pb-2 text-sm font-semibold text-foreground md:text-base"
      />
    ) : column.title ? (
      <h3 className="mb-3 block border-b border-border/30 pb-2 text-sm font-semibold text-foreground md:text-base">
        {column.title}
      </h3>
    ) : null}

    <div className="space-y-1">
      {column.items.map((colItem, itemIndex) =>
        "links" in colItem ? (
          <div
            key={`${colItem.href || colItem.title}-${itemIndex}`}
            className="mt-4 border-t border-border/20 pt-3 first:mt-0 first:border-t-0 first:pt-0"
          >
            <ListItem
              href={colItem.href}
              title={colItem.title}
              onClick={handleLinkClick(colItem.href, colItem.title)}
              className="mb-2 text-sm font-medium text-foreground md:text-base"
            />
            <ul className="mt-2 space-y-1">
              {colItem.links.map((link) => (
                <li key={`${link.href}-${link.title}`}>
                  <ListItem
                    {...link}
                    onClick={handleLinkClick(link.href, link.title)}
                    className="block border-l-2 border-border/30 py-2 pl-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground md:py-1.5"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ListItem
            key={`${(colItem as LinkItem).href}-${itemIndex}`}
            {...colItem}
            onClick={handleLinkClick(colItem.href, colItem.title)}
          >
            {colItem.description}
          </ListItem>
        )
      )}
    </div>
  </div>
));
MenuColumn.displayName = "MenuColumn";

export const CTABlock = React.memo<{
  cta: CallToAction;
  handleLinkClick: (
    href: string,
    title: string
  ) => (e: React.MouseEvent) => void;
}>(({ cta, handleLinkClick }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="w-full rounded-lg bg-gradient-to-br from-muted/20 to-muted/60 p-4 md:w-[280px] md:p-6 lg:w-[320px]">
      <NavigationMenuLink asChild>
        <a
          href={cta.href}
          onClick={handleLinkClick(cta.href, cta.title)}
          className="block touch-manipulation transition-transform outline-none hover:scale-[1.02] focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-[0.98]"
          aria-label={`${cta.title}: ${cta.description}`}
        >
          <div className="relative mb-4 h-28 overflow-hidden rounded-md bg-muted/50 md:h-32">
            {!imageError ? (
              <>
                <Image
                  src={cta.imgSrc}
                  alt={cta.title}
                  fill
                  className={cn(
                    "cursor-pointer object-cover transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/40 to-muted/10" />
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/30" />
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-base font-semibold text-foreground md:text-lg">
              {cta.title}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {cta.description}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </div>
  );
});
CTABlock.displayName = "CTABlock";
