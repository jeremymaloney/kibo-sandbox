"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Smartphone,
  LogOut,
  User,
  Heart,
  History,
  Home,
  Laptop,
  Headphones,
  Gamepad2,
  ChevronDown,
  Hexagon,
} from "lucide-react";
import { useState } from "react";

const PRODUCT_CATEGORIES = [
  {
    key: "computers-laptops",
    label: "Computers & Laptops",
    icon: Laptop,
    subcategories: [
      { key: "gaming-laptops", label: "Gaming Laptops" },
      { key: "business-laptops", label: "Business Laptops" },
      { key: "ultrabooks", label: "Ultrabooks" },
      { key: "macbooks", label: "MacBooks" },
      { key: "gaming-pcs", label: "Gaming PCs" },
      { key: "workstations", label: "Workstations" },
    ],
  },
  {
    key: "mobile-accessories",
    label: "Mobile & Accessories",
    icon: Smartphone,
    subcategories: [
      { key: "iphone", label: "iPhone" },
      { key: "android", label: "Android" },
      { key: "tablets", label: "Tablets" },
      { key: "phone-cases", label: "Phone Cases" },
      { key: "chargers", label: "Chargers" },
      { key: "screen-protectors", label: "Screen Protectors" },
    ],
  },
  {
    key: "audio-video",
    label: "Audio & Video",
    icon: Headphones,
    subcategories: [
      { key: "headphones", label: "Headphones" },
      { key: "earbuds", label: "Wireless Earbuds" },
      { key: "speakers", label: "Bluetooth Speakers" },
      { key: "smart-speakers", label: "Smart Speakers" },
      { key: "soundbars", label: "Soundbars" },
    ],
  },
  {
    key: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    subcategories: [
      { key: "playstation", label: "PlayStation" },
      { key: "xbox", label: "Xbox" },
      { key: "nintendo", label: "Nintendo Switch" },
      { key: "pc-gaming", label: "PC Gaming" },
      { key: "gaming-accessories", label: "Gaming Accessories" },
    ],
  },
  {
    key: "smart-home",
    label: "Smart Home",
    icon: Home,
    subcategories: [
      { key: "smart-displays", label: "Smart Displays" },
      { key: "security-cameras", label: "Security Cameras" },
      { key: "smart-lighting", label: "Smart Lighting" },
      { key: "thermostats", label: "Smart Thermostats" },
    ],
  },
];

const ACCOUNT_OPTIONS = [
  { key: "account", label: "My Account", icon: User },
  { key: "orders", label: "Order History", icon: History },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "logout", label: "Logout", icon: LogOut },
];

const sideBarFooter = "© 2025 TechStore";

export default function MobileSidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const set = new Set(prev);
      if (set.has(category)) {
        set.delete(category);
      } else {
        set.add(category);
      }
      return Array.from(set);
    });
  };

  const handleLinkClick = (key: string) => {
    // Implement your navigation logic here
    // Example: router.push(NAVIGATION_ROUTES[key]);
    console.log(`Navigate to: ${key}`);
  };

  const handleProductClick = (categoryKey: string, subcategoryKey: string) => {
    // Implement your product navigation logic here
    // Example: router.push(`/products/${categoryKey}/${subcategoryKey}`);
    console.log(`Navigate to product: ${categoryKey}/${subcategoryKey}`);
  };

  // Consider extracting the SidebarProvider and Sidebar Trigger at the top level of your app. It's being included here for demonstration purposes. API docs: https://ui.shadcn.com/docs/components/sidebar

  return (
    <div className="block">
      {/* Always visible for demo purposes. Implement toggle functionality */}
      <SidebarProvider open={true} onOpenChange={() => {}}>
        <div className="block">
          <Sidebar
            collapsible="offcanvas"
            className="transition-transform duration-300 ease-in-out"
          >
            <SidebarContent className="overflow-y-auto">
              <SidebarGroup>
                <SidebarGroupLabel className="mb-4 gap-2 px-3 py-2 text-lg font-semibold text-foreground">
                  <Hexagon className="h-6 w-6 text-primary md:h-8 md:w-8" />
                  TechStore
                </SidebarGroupLabel>
                <SidebarMenu>
                  {PRODUCT_CATEGORIES.map(
                    ({
                      key: categoryKey,
                      icon: Icon,
                      label,
                      subcategories,
                    }) => {
                      const isExpanded =
                        expandedCategories.includes(categoryKey);
                      return (
                        <SidebarMenuItem key={categoryKey}>
                          <SidebarMenuButton
                            onClick={() => toggleCategory(categoryKey)}
                            aria-expanded={isExpanded}
                            aria-controls={`${categoryKey}-submenu`}
                            className="flex touch-manipulation items-center justify-between p-3 transition-all duration-200 hover:bg-accent/50"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="font-medium">{label}</span>
                            </div>
                            <div
                              className={`transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : "rotate-0"
                              }`}
                            >
                              <ChevronDown className="h-4 w-4 text-primary" />
                            </div>
                          </SidebarMenuButton>
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isExpanded
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {isExpanded && (
                              <SidebarMenuSub
                                id={`${categoryKey}-submenu`}
                                className="ml-4 animate-in border-l border-border/30 duration-200 slide-in-from-top-2"
                              >
                                {subcategories.map(
                                  ({ key: subKey, label: subLabel }) => (
                                    <SidebarMenuSubItem key={subKey}>
                                      <SidebarMenuSubButton
                                        onClick={() =>
                                          handleProductClick(
                                            categoryKey,
                                            subKey
                                          )
                                        }
                                        className="touch-manipulation py-2.5 pl-6 transition-all duration-150 hover:translate-x-1 hover:bg-accent/30"
                                      >
                                        {subLabel}
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )
                                )}
                              </SidebarMenuSub>
                            )}
                          </div>
                        </SidebarMenuItem>
                      );
                    }
                  )}
                </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator className="my-4" />

              <SidebarGroup>
                <SidebarGroupLabel className="px-3 py-2 text-sm font-semibold text-foreground">
                  Account
                </SidebarGroupLabel>
                <SidebarMenu>
                  {ACCOUNT_OPTIONS.map(({ icon: Icon, label, key }) => (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton
                        onClick={() => handleLinkClick(key)}
                        className="flex touch-manipulation items-center gap-3 p-3 transition-all duration-200 hover:translate-x-1 hover:bg-accent/50"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-border/30 p-4">
              <span className="text-center text-xs text-muted-foreground">
                {sideBarFooter}
              </span>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        </div>
      </SidebarProvider>
    </div>
  );
}
