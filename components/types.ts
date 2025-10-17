import { type NavItem } from "./mega-menu.data";

export type { NavItem };

export interface MegaMenuProps {
  navItems?: NavItem[];
  showSearchBar?: boolean;
  onLinkClick?: (link: { href: string; title: string }) => void;
  className?: string;
  ariaLabel?: string;
  brandLogo?: string;
  brandLogoAlt?: string;
  onBrandClick?: () => void;
  menuPosition?: "center" | "start";
  // Action button props
  showUserActions?: boolean;
  showCart?: boolean;
  showLanguageSelector?: boolean;
  onCartClick?: () => void;
  onLoginClick?: () => void;
  onLanguageChange?: (language: string) => void;
  cartItemCount?: number;
  currentLanguage?: string;
  isUserLoggedIn?: boolean;
  userDisplayName?: string;
}

export interface UserAccountButtonProps {
  isLoggedIn?: boolean;
  userDisplayName?: string;
  onLoginClick?: () => void;
}

export interface CartButtonProps {
  itemCount?: number;
  onCartClick?: () => void;
}

export interface LanguageSelectorProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export interface BrandLogoProps {
  brandLogo?: string;
  brandLogoAlt?: string;
  onBrandClick?: () => void;
}
