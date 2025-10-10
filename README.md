# Kibo Sandbox - Developer Learning Environment

A Next.js sandbox environment for developers to learn and experiment with React, Next.js, and Kibo Commerce APIs.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Kibo Commerce API**

## Features

✅ **Live Kibo Integration** - Fetches real product data from Kibo Commerce API  
✅ **Product Catalog** - Displays products with images, prices, and stock levels  
✅ **Error Handling** - Graceful fallbacks for missing product images  
✅ **Reusable Components** - Button, Link, Input, Form components ready to use  
✅ **TypeScript** - Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Kibo Commerce sandbox credentials (Application Key, Shared Secret, Tenant ID, Site ID)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jeremymaloney/kibo-sandbox.git
cd kibo-sandbox
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Kibo credentials:
```env
KIBO_APP_KEY=your_application_key
KIBO_SHARED_SECRET=your_shared_secret
KIBO_TENANT_ID=your_tenant_id
KIBO_SITE_ID=your_site_id
```

> **Note:** Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
kibo-sandbox/
├── app/
│   ├── page.tsx              # Main products page with Kibo integration
│   └── api/
│       └── products/
│           └── route.ts      # API route for Kibo product fetching
├── components/
│   ├── Button.tsx            # Customizable button component
│   ├── Link.tsx              # Minimal link component
│   ├── Input.tsx             # Minimal input component
│   ├── Form.tsx              # Minimal form wrapper
│   └── ProductCard.tsx       # Minimal product display
└── README.md
```

## How It Works

### Kibo API Integration

The application uses a Next.js API route (`app/api/products/route.ts`) to:
1. Authenticate with Kibo Commerce using OAuth credentials
2. Fetch product data from your Kibo sandbox catalog
3. Return formatted product data to the frontend

### Product Display

- Products are fetched on page load via the `/api/products` endpoint
- Product images are displayed with automatic fallback to gray placeholder tiles for missing images
- Product information includes name, code, price, and stock availability

## Finding Your Kibo Credentials

1. **Application Key & Shared Secret**: 
   - Log into Kibo Dev Console: https://developer.usc1.gcp.kibocommerce.com
   - Navigate to your application
   - Copy the Application Key and Shared Secret

2. **Tenant ID & Site ID**:
   - Found in your Kibo admin URL
   - Format: `https://t{TENANT_ID}.sb.usc1.gcp.kibocommerce.com/admin/s-{SITE_ID}/...`

## Components Philosophy

All components start with **minimal props** intentionally. This allows developers to:
- Learn by adding features incrementally
- Practice prop management
- Understand component composition
- Make PRs to enhance components

Each component file includes TODO comments suggesting features to add.

## Contributing

This is a learning sandbox! Feel free to:
- Add new components
- Enhance existing components
- Add new features
- Experiment with different approaches

### Suggested Enhancement Ideas

1. Add product filtering and search
2. Create individual product detail pages
3. Add shopping cart functionality
4. Implement product categories
5. Add user authentication
6. Create an order management system

## Troubleshooting

### 401 Authentication Error
- Verify your credentials in `.env.local` are correct
- Ensure your Kibo application is installed to your tenant
- Check that the Application Key includes the full key (e.g., `tenant.AppName.1.0.0.Release`)

### Images Not Loading
- Product images returning 404 means they don't exist in your Kibo catalog
- Upload images in Kibo admin for each product
- Gray placeholder tiles will show for products without images

### Environment Variables Not Loading
- Restart your Next.js dev server after updating `.env.local`
- Ensure `.env.local` is in the project root directory
- Check for typos in variable names

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Kibo Commerce API Docs](https://docs.kibocommerce.com)

## Questions?

Reach out to your team lead or check the Kibo training materials for more information about the platform.

---

**Happy coding! 🚀**
