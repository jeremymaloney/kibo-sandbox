"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from "@/components/search-bar";
import MobileSidebar from "@/components/mobile-sidebar";
import { navigationData } from "./bt-mega-menu.data";
import { type MegaMenuProps } from "@/components/types";
import { BrandLogo } from "./brand-logo";
import {
  UserAccountButton,
  CartButton,
  LanguageSelector,
} from "@/components/action-buttons";
import { MenuColumn, CTABlock } from "@/components/menu-components";

export default function MegaMenu({
  navItems = navigationData,
  showSearchBar = true,
  onLinkClick,
  className,
  ariaLabel = "Main navigation",
  brandLogo,
  brandLogoAlt = "Brand logo",
  onBrandClick,
  showUserActions = true,
  showCart = true,
  showLanguageSelector = true,
  onCartClick,
  onLoginClick,
  cartItemCount = 0,
  isUserLoggedIn = false,
  userDisplayName,
}: MegaMenuProps) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const handleLinkClick = React.useCallback(
    (href: string, title: string) => (e: React.MouseEvent) => {
      if (onLinkClick) {
        e.preventDefault();
        onLinkClick({ href, title });
      }
    },
    [onLinkClick]
  );

  const renderBrandLogo = () => (
    <BrandLogo
      brandLogo={brandLogo}
      brandLogoAlt={brandLogoAlt}
      onBrandClick={onBrandClick}
    />
  );

  const renderActionButtons = () => (
    <div className="flex justify-end gap-1">
      {showLanguageSelector && <LanguageSelector />}
      {showCart && (
        <CartButton itemCount={cartItemCount} onCartClick={onCartClick} />
      )}
      {showUserActions && (
        <UserAccountButton
          isLoggedIn={isUserLoggedIn}
          userDisplayName={userDisplayName}
          onLoginClick={onLoginClick}
        />
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation - Two Row Layout */}
      <div
        className={cn(
          "relative hidden w-full bg-background lg:block",
          className
        )}
      >
        {/* First Row: Brand, Search, Action Buttons */}
        <header
          className="flex w-full items-center justify-between border-b border-border/50 px-4 py-2 lg:px-6"
          role="banner"
        >
          <div className="w-1/3 flex-shrink-0">{renderBrandLogo()}</div>

          {showSearchBar && (
            <div className="w-1/3flex w-lg px-4 lg:px-6">
              <SearchBar
                className="w-full max-w-xs transition-opacity duration-200 lg:max-w-sm"
                hintText="Hint: Type 'Laptop' or 'Smartphone' for suggestions."
                aria-label="Search products"
              />
            </div>
          )}

          <div className="w-1/3 flex-shrink-0">{renderActionButtons()}</div>
        </header>

        {/* Second Row: Navigation Menu */}
        <nav
          className="flex w-full items-center border-t border-primary/50 bg-transparent px-4 py-1 lg:px-6"
          aria-label={ariaLabel}
        >
          <div className="flex w-full justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.content ? (
                      <>
                        <NavigationMenuTrigger>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {item.content.cta ? (
                            <div className="flex w-[min(100vw-2rem,400px)] flex-col bg-popover p-4 md:w-[min(700px,100vw-2rem)] md:flex-row md:p-6 lg:w-[min(700px,100vw-2rem)] lg:p-8">
                              <div className="flex flex-1 flex-col gap-4 md:flex-row md:gap-x-6">
                                {item.content.columns.map(
                                  (column, colIndex) => (
                                    <MenuColumn
                                      key={colIndex}
                                      column={column}
                                      handleLinkClick={handleLinkClick}
                                    />
                                  )
                                )}
                              </div>
                              <div className="mt-4 flex-shrink-0 md:mt-0 md:ml-6 lg:ml-8">
                                <CTABlock
                                  cta={item.content.cta}
                                  handleLinkClick={handleLinkClick}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex w-[min(100vw-2rem,400px)] flex-col p-4 md:w-[min(700px,100vw-2rem)] md:flex-row md:p-6 lg:w-[min(700px,100vw-2rem)] lg:p-8">
                              <div className="flex flex-col gap-4 md:flex-row md:gap-x-6">
                                {item.content.columns.map(
                                  (column, colIndex) => (
                                    <MenuColumn
                                      key={colIndex}
                                      column={column}
                                      handleLinkClick={handleLinkClick}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </NavigationMenuContent>
                      </>
                    ) : item.href ? (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={navigationMenuTriggerStyle()}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                          onClick={handleLinkClick(item.href, item.title)}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <span
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "cursor-default opacity-60"
                        )}
                      >
                        {item.title}
                      </span>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <header
        className={cn(
          "flex w-full items-center justify-between border-b bg-background px-4 py-2 lg:hidden",
          className
        )}
        role="banner"
      >
        <div className="flex-shrink-0">{renderBrandLogo()}</div>

        <div className="flex items-center gap-2">
          {renderActionButtons()}

          <Sheet
            open={isMobileSidebarOpen}
            onOpenChange={setIsMobileSidebarOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-auto p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <MobileSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
