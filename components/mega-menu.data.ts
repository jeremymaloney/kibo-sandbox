export interface LinkItem {
  title: string;
  href: string;
  description?: string;
}

export interface LinkGroup {
  title: string;
  href: string;
  links: LinkItem[];
}

export interface ContentColumn {
  title?: string;
  href?: string;
  items: (LinkItem | LinkGroup)[];
}

export interface CallToAction {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
}

export interface NavItem {
  title: string;
  href?: string;
  content?: {
    columns: ContentColumn[];
    cta?: CallToAction;
  };
}

export const navigationData: NavItem[] = [
  {
    title: "New Arrivals",
    content: {
      columns: [
        {
          items: [
            {
              title: "Latest Tech",
              href: "/products/latest",
              description: "Newest gadgets and innovations.",
            },
            {
              title: "Pre-Orders",
              href: "/products/pre-orders",
              description: "Reserve upcoming releases.",
            },
            {
              title: "Flash Deals",
              href: "/products/flash-deals",
              description: "Limited-time tech offers.",
            },
          ],
        },
      ],
      cta: {
        title: "Black Friday Tech Sale",
        description: "Up to 40% off on top tech brands.",
        href: "/sale",
        imgSrc: "/images/mega-menu-cta.jpg",
      },
    },
  },
  {
    title: "Computers & Laptops",
    content: {
      columns: [
        {
          title: "Laptops",
          href: "/products/laptops",
          items: [
            { title: "Gaming Laptops", href: "/products/laptops/gaming" },
            { title: "Business Laptops", href: "/products/laptops/business" },
            { title: "Ultrabooks", href: "/products/laptops/ultrabooks" },
            { title: "MacBooks", href: "/products/laptops/macbooks" },
          ],
        },
        {
          title: "Desktops & Components",
          href: "/products/desktops",
          items: [
            { title: "Gaming PCs", href: "/products/desktops/gaming" },
            { title: "Workstations", href: "/products/desktops/workstations" },
            { title: "Graphics Cards", href: "/products/components/gpu" },
            { title: "Processors", href: "/products/components/cpu" },
          ],
        },
      ],
    },
  },
  {
    title: "Mobile & Accessories",
    content: {
      columns: [
        {
          title: "Smartphones",
          href: "/products/smartphones",
          items: [
            {
              title: "iPhone",
              href: "/products/smartphones/iphone",
              links: [
                { title: "iPhone 15 Series", href: "/products/iphone-15" },
                { title: "iPhone 14 Series", href: "/products/iphone-14" },
              ],
            },
            {
              title: "Android",
              href: "/products/smartphones/android",
              links: [
                { title: "Samsung Galaxy", href: "/products/samsung-galaxy" },
                { title: "Google Pixel", href: "/products/google-pixel" },
              ],
            },
          ],
        },
        {
          title: "Tablets & E-readers",
          href: "/products/tablets",
          items: [
            {
              title: "iPad",
              href: "/products/tablets/ipad",
              links: [
                { title: "iPad Pro", href: "/products/ipad-pro" },
                { title: "iPad Air", href: "/products/ipad-air" },
              ],
            },
            {
              title: "Android Tablets",
              href: "/products/tablets/android",
              links: [
                { title: "Samsung Tab", href: "/products/samsung-tab" },
                { title: "Kindle", href: "/products/kindle" },
              ],
            },
          ],
        },
        {
          title: "Accessories",
          href: "/products/mobile-accessories",
          items: [
            {
              title: "Cases & Protection",
              href: "/products/accessories/cases",
              links: [
                { title: "Phone Cases", href: "/products/phone-cases" },
                {
                  title: "Screen Protectors",
                  href: "/products/screen-protectors",
                },
              ],
            },
            {
              title: "Charging & Power",
              href: "/products/accessories/charging",
              links: [
                {
                  title: "Wireless Chargers",
                  href: "/products/wireless-chargers",
                },
                { title: "Power Banks", href: "/products/power-banks" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    title: "Audio & Video",
    content: {
      columns: [
        {
          title: "Headphones & Earbuds",
          href: "/products/audio",
          items: [
            { title: "AirPods", href: "/products/airpods" },
            { title: "Gaming Headsets", href: "/products/gaming-headsets" },
            {
              title: "Over-Ear Headphones",
              href: "/products/over-ear-headphones",
            },
            { title: "Wireless Earbuds", href: "/products/wireless-earbuds" },
          ],
        },
        {
          title: "Speakers & Sound",
          href: "/products/speakers",
          items: [
            {
              title: "Bluetooth Speakers",
              href: "/products/bluetooth-speakers",
            },
            { title: "Smart Speakers", href: "/products/smart-speakers" },
            { title: "Soundbars", href: "/products/soundbars" },
            { title: "Home Theater", href: "/products/home-theater" },
          ],
        },
      ],
    },
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Support",
    href: "/support",
  },
];
