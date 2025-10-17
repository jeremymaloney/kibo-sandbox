"use client";

/**
 * Action Buttons Components
 *
 * Contains all the action buttons used in the mega menu:
 * - UserAccountButton: Login/User dropdown with account actions
 * - CartButton: Shopping cart with item count badge
 * - LanguageSelector: Language selection dropdown
 */

import * as React from "react";
import {
  User,
  ShoppingCart,
  Globe,
  History,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectGroup } from "@radix-ui/react-select";
import {
  type UserAccountButtonProps,
  type CartButtonProps,
  type LanguageSelectorProps,
} from "./types";

export const UserAccountButton = React.memo<UserAccountButtonProps>(
  ({ isLoggedIn, userDisplayName, onLoginClick }) => {
    const handleAction = (action: string) => {
      if (action === "login" && onLoginClick) {
        onLoginClick();
        return;
      }
      // Handle other actions - these can be wired to actual functionality
      console.log(`User action: ${action}`);
    };

    // If user is not logged in, show simple Login button
    if (!isLoggedIn) {
      return (
        <Button
          variant="ghost"
          className="h-9 gap-2 px-3"
          onClick={() => handleAction("login")}
          aria-label="Login to your account"
        >
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">Login</span>
        </Button>
      );
    }

    // If user is logged in, show dropdown menu
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-9 gap-1 px-2"
            aria-label={`User menu for ${userDisplayName}`}
          >
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">
              {userDisplayName ? userDisplayName : "Account"}
            </span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleAction("account")}>
            <User className="mr-2 h-4 w-4" />
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("orders")}>
            <History className="mr-2 h-4 w-4" />
            Order History
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("logout")}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export const LanguageSelector = React.memo<LanguageSelectorProps>(() => {
  const languages = {
    en: { code: "EN", displayName: "🇺🇸 English" },
    fr: { code: "FR", displayName: "🇫🇷 Francais" },
    es: { code: "ES", displayName: "🇪🇸 Español" },
  } as const;

  const [selectedLanguage, setSelectedLanguage] =
    React.useState<keyof typeof languages>("en");

  return (
    <Select
      value={selectedLanguage}
      onValueChange={(newValue) =>
        setSelectedLanguage(newValue as keyof typeof languages)
      }
    >
      <SelectTrigger className="h-9 w-auto cursor-pointer gap-1 border-0 bg-transparent px-2 shadow-none hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0">
        <Globe className="mr-1 h-4 w-4 shrink-0" />
        <SelectValue aria-label={selectedLanguage}>
          {languages[selectedLanguage].code}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[130px]">
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {Object.entries(languages).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label.displayName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export const CartButton = React.memo<CartButtonProps>(
  ({ itemCount = 0, onCartClick }) => {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9"
        onClick={onCartClick}
        aria-label={`Shopping cart ${itemCount > 0 ? `with ${itemCount} items` : "(empty)"}`}
      >
        <ShoppingCart className="h-4 w-4" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        )}
      </Button>
    );
  }
);

UserAccountButton.displayName = "UserAccountButton";
LanguageSelector.displayName = "LanguageSelector";
CartButton.displayName = "CartButton";
