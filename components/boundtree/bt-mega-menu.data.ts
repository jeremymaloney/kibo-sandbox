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
  // {
  //   title: "Products",
  //   content: {
  //     columns: [
  //       {
  //         items: [
  //           { title: "On Sale", href: "/products" },
  //           { title: "Airway & Oxygen Delivery", href: "/products" },
  //           { title: "Apparel", href: "/products" },
  //           { title: "Curaplex", href: "/products" },
  //           { title: "Equipment Bags", href: "/products" },
  //           { title: "First Aid, Trauma & Wound Care", href: "/products" },
  //           { title: "IV & Drug Delivery", href: "/products" },
  //           { title: "Immobilization & Splinting", href: "/products" },
  //           { title: "Infection Control", href: "/products" },
  //           { title: "Inventory Management & Reference", href: "/products" },
  //           { title: "Kits", href: "/products" },
  //           { title: "Monitoring & Diagnostics", href: "/products" },
  //           { title: "Oxygen Equipment & Respiratory", href: "/products" },
  //           { title: "Patient Handling", href: "/products" },
  //           { title: "Pharmaceuticals", href: "/products" },
  //           { title: "Suction", href: "/products" },
  //           { title: "Tactical Medicine, MCI & Rescue", href: "/products" },
  //           { title: "Training & Simulation", href: "/products" },
  //         ],
  //       },
  //     ],
  //   },
  // },
  {
    title: "Pharmaceuticals",
    content: {
      columns: [
        {
          title: "Shop",
          href: "/boundtree/pharmaceuticals",
          items: [ 
            { title: "AEDs", href: "/boundtree/aeds" },
            { title: "Controlled Substances", href: "/class-iv-drugs/c/234" },
            { title: "Drugs Sold by Each", href: "/products" },
            { title: "IV Admin Sets", href: "/products" },
            { title: "IV Fluids, Flushes & Solutions", href: "/products" },
            { title: "OTC Medicinals", href: "/products" },
            { title: "Pharma Kits", href: "/products" },
            { title: "Rx Pharmaceuticals", href: "/products" },
          ],
        },
        {
          title: "How To Order",
          href: "/products",
          items: [
            { title: "CSOS Controlled Substance Ordering", href: "/csos" },
            {
              title: "License Authorization Form",
              href: "https://cdn.boundtree.com/assets/btm/pdfs/Bound_Tree_License_Authorization_Form.pdf?_gl=1*nq04dn*_gcl_au*MTMzMjI0NDQ2Ni4xNzYzNDcyMDM3",
            },
            {
              title: "Paper 222 Class II Ordering",
              href: "https://cdn.boundtree.com/assets/btm/pdfs/Bound_Tree_Controlled_Substances_Ordering_Guidelines.pdf?_gl=1*6tmlos*_gcl_au*MTMzMjI0NDQ2Ni4xNzYzNDcyMDM3",
            },
            {
              title: "Navigating Pharmaceutical Ordering",
              href: "/navigating-pharma",
            },
          ],
        },
        {
          title: "Resources",
          href: "/products",
          items: [
            {
              title: "Pharmaceutical Accreditations",
              href: "/licensing-&-compliance",
            },
            {
              title: "Pharmaceutical Backorder Report",
              href: "https://cdn.boundtree.com/assets/btm/pdfs/Bound_Tree_Pharmaceutical_Back_Order_Report.pdf?_gl=1*10fas8y*_gcl_au*MTMzMjI0NDQ2Ni4xNzYzNDcyMDM3",
            },
            {
              title: "The Pharmaceutical Advantage",
              href: "/pharmaceutical-advantage",
            },
            {
              title: "UCapIt Controlled Medical Supply",
              href: "/navigating-pharma",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Curaplex",
    content: {
      columns: [
        {
          title: "Our Brand",
          href: "/brands/curaplex",
          items: [
            { title: "Curaplex for EMS by EMS", href: "/products" },
            { title: "Curaplex Convenience Kitting", href: "/products" },
            {
              title: "OneScope&reg; Pro",
              href: "/products",
            },
            { title: "Shop Curaplex Products", href: "/products" },
            { title: "Shop Curaplex Kits", href: "/products" },
          ],
        },
      ],
    },
  },
  {
    title: "Services, Solutions & Technology",
    content: {
      columns: [
        {
          title: "Capital Equipment",
          href: "/products",
          items: [
            { title: "About Capital Equipment Services", href: "/products" },
            { title: "Equipment Buy-Back or Trade-In", href: "/products" },
            {
              title: "Preventative Maintenance & Service",
              href: "/products",
            },
            { title: "Shop New Equipment", href: "/products" },
            { title: "Shop Recertified Equipment", href: "/products" },
          ],
        },
        {
          title: "Inventory Management",
          href: "/products",
          items: [
            { title: "About Inventory Management", href: "/products" },
            { title: "ESO Inventory Management", href: "/products" },
            {
              title: "Operative IQ Operations Management",
              href: "/products",
            },
            { title: "Subscriptions", href: "/products" },
            { title: "UCapIt Controlled Medical Supply", href: "/products" },
          ],
        },
        {
          title: "Billing & Reimbursement",
          href: "/products",
          items: [
            {
              title: "Medicare Data Collection Services",
              href: "/products",
            },
          ],
        },
      ],
    },
  },
  {
    title: "What's New",
    content: {
      columns: [
        {
          title: "EMS Advocacy",
          href: "/products",
          items: [
            { title: "EMS Advocacy Updates", href: "/products" },
            { title: "Emergency Disaster Support", href: "/products" },
          ],
        },
        {
          title: "EMS Programs",
          href: "/products",
          items: [
            { title: "Community Paramedicine", href: "/products" },
            { title: "Subscriptions", href: "/products" },
            { title: "Whole Blood Program", href: "/products" },
          ],
        },
      ],
    },
  },
  {
    title: "EMS Training",
    content: {
      columns: [
        {
          title: "Training & Education",
          href: "/product",
          items: [
            { title: "Bound Tree EDU", href: "/products" },
            { title: "Scholarship Program", href: "/products" },
            {
              title: "Webinars",
              href: "/products",
            },
          ],
        },
      ],
    },
  },
];
