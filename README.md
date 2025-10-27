# Kibo Sandbox - Developer Learning Environment

A Next.js sandbox environment for developers to learn and experiment with React, Next.js, and Kibo Commerce APIs.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** - UI component library
- **Aries-UI** - Shared component library for Kibo Commerce projects
- **Kibo Commerce API**

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

#### Node.js
- **Version Required:** 18.17 or higher (20.x LTS recommended)
- **Check your version:**
  ```bash
  node --version
  ```
- **Installation:**
  - **Windows/macOS:** Download from [nodejs.org](https://nodejs.org/)
  - **macOS (via Homebrew):**
    ```bash
    brew install node@20
    ```
  - **Linux (via nvm - recommended):**
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    nvm install 20
    nvm use 20
    ```

#### npm (comes with Node.js)
- **Version Required:** 9.x or higher
- **Check your version:**
  ```bash
  npm --version
  ```
- **Update npm:**
  ```bash
  npm install -g npm@latest
  ```

#### Git
- **Check your version:**
  ```bash
  git --version
  ```
- **Installation:** Download from [git-scm.com](https://git-scm.com/)

### Kibo Commerce Credentials

You'll need the following credentials from your Kibo Commerce sandbox:
- Application Key
- Shared Secret
- Tenant ID
- Site ID

See the [Finding Your Kibo Credentials](#finding-your-kibo-credentials) section below for details.

## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jeremymaloney/kibo-sandbox.git
   cd kibo-sandbox
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - Next.js 15.x
   - React 19.x
   - TypeScript
   - Tailwind CSS
   - shadcn/ui components
   - Aries-UI component library
   - All other project dependencies

3. **Create environment file:**
   
   Create a `.env.local` file in the root directory with your Kibo credentials:
   ```env
   KIBO_APP_KEY=your_application_key
   KIBO_SHARED_SECRET=your_shared_secret
   KIBO_TENANT_ID=your_tenant_id
   KIBO_SITE_ID=your_site_id
   ```

   > **Security Note:** Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

4. **Verify installation:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### First Time Setup Checklist

- [ ] Node.js 18.17+ installed
- [ ] npm 9.x+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env.local` file created with valid credentials
- [ ] Development server starts without errors
- [ ] Application loads in browser
- [ ] Products display from Kibo API

## Project Structure

```
kibo-sandbox/
├── app/
│   ├── page.tsx                    # Main products page with Kibo integration
│   ├── layout.tsx                  # Root layout component
│   ├── globals.css                 # Global styles and Tailwind imports
│   └── api/
│       └── products/
│           └── route.ts            # API route for Kibo product fetching
│
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...                     # Other shadcn components
│   │
│   ├── aries-ui/                   # Aries-UI shared components (when installed)
│   │   └── ...                     # Shared components from Aries library
│   │
│   ├── Button.tsx                  # Custom button component
│   ├── Link.tsx                    # Minimal link component
│   ├── Input.tsx                   # Minimal input component
│   ├── Form.tsx                    # Minimal form wrapper
│   └── ProductCard.tsx             # Product display component
│
├── lib/
│   └── utils.ts                    # Utility functions
│
├── public/
│   └── ...                         # Static assets
│
├── .env.local                      # Environment variables (create this)
├── .gitignore
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies and scripts
└── README.md
```

## Using Aries-UI Components

This project uses the **Aries-UI component library** - a shared component library designed for consistency across all Kibo Commerce projects.

### Available Aries-UI Components

The Aries-UI library provides pre-built, reusable components for common e-commerce patterns:

- Form components (Input, Select, Checkbox, Radio)
- Navigation components (Header, Footer, Navigation)
- Product components (ProductCard, ProductGrid, ProductDetail)
- Cart components (CartItem, CartSummary)
- Checkout components (CheckoutForm, PaymentForm, ShippingForm)

### Importing Aries-UI Components

```tsx
import { ProductCard, Button } from '@/components/aries-ui'

// Use in your component
<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
/>
```

### Component Documentation

For detailed documentation on Aries-UI components, see:
- Component props and usage examples
- Styling and customization options
- Integration with Kibo APIs

> **Note:** Aries-UI is designed to work seamlessly with shadcn/ui components. You can mix and match components from both libraries.

## How It Works

### Kibo API Integration

The application uses a Next.js API route (`app/api/products/route.ts`) to:
1. Authenticate with Kibo Commerce using OAuth credentials
2. Fetch product data from your Kibo sandbox catalog
3. Return formatted product data to the frontend

### Authentication Flow

```typescript
// OAuth 2.0 Client Credentials flow
POST https://home.usc1.gcp.kibocommerce.com/api/platform/applications/authtickets/oauth
Headers:
  Content-Type: application/json
Body:
  {
    "client_id": "YOUR_APP_KEY",
    "client_secret": "YOUR_SHARED_SECRET",
    "grant_type": "client_credentials"
  }
```

### Product Display

- Products are fetched on page load via the `/api/products` endpoint
- Product images are displayed with automatic fallback to gray placeholder tiles for missing images
- Product information includes name, code, price, and stock availability
- Uses ProductCard component from Aries-UI for consistent styling

## Finding Your Kibo Credentials

### Application Key & Shared Secret

1. Log into Kibo Dev Console: https://developer.usc1.gcp.kibocommerce.com
2. Navigate to your application
3. Copy the **Application Key** (format: `tenant.AppName.1.0.0.Release`)
4. Copy the **Shared Secret**

### Tenant ID & Site ID

Found in your Kibo admin URL:
```
https://t{TENANT_ID}.sb.usc1.gcp.kibocommerce.com/admin/s-{SITE_ID}/...
```

**Example:**
- URL: `https://t12345.sb.usc1.gcp.kibocommerce.com/admin/s-67890/catalog`
- Tenant ID: `12345`
- Site ID: `67890`

## Components Philosophy

All custom components start with **minimal props** intentionally. This allows developers to:
- Learn by adding features incrementally
- Practice prop management
- Understand component composition
- Make PRs to enhance components

Each component file includes TODO comments suggesting features to add.

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

### Running Production Build Locally

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Contributing

This is a learning sandbox! Feel free to:
- Add new components to the Aries-UI library
- Enhance existing components
- Add new features
- Experiment with different approaches
- Create pull requests for improvements

### Suggested Enhancement Ideas

1. **Product Features:**
   - Add product filtering and search
   - Create individual product detail pages
   - Implement product variants (size, color)
   - Add product reviews and ratings

2. **Shopping Experience:**
   - Add shopping cart functionality
   - Implement wishlist feature
   - Create checkout flow
   - Add order confirmation

3. **Navigation & Organization:**
   - Implement product categories
   - Add breadcrumb navigation
   - Create mega menu
   - Add search autocomplete

4. **User Features:**
   - Add user authentication
   - Create user profile pages
   - Implement order history
   - Add saved addresses

5. **Aries-UI Components:**
   - Create new reusable components
   - Add component variants
   - Improve component accessibility
   - Add comprehensive prop types

## Troubleshooting

### Installation Issues

#### "Node version not supported"
- Ensure you have Node.js 18.17 or higher installed
- Check with `node --version`
- Update Node.js if necessary

#### "npm install fails"
- Delete `node_modules` folder and `package-lock.json`
- Run `npm cache clean --force`
- Run `npm install` again

#### "Module not found" errors
- Ensure all dependencies are installed: `npm install`
- Restart your development server
- Check for typos in import paths

### API & Authentication Issues

#### "401 Authentication Error"
- Verify your credentials in `.env.local` are correct
- Ensure your Kibo application is installed to your tenant
- Check that the Application Key includes the full key (e.g., `tenant.AppName.1.0.0.Release`)
- Restart your dev server after updating `.env.local`

#### "CORS errors"
- Ensure you're using the API route (`/api/products`) instead of calling Kibo directly from the frontend
- Check that your credentials have proper permissions in Kibo

### Display Issues

#### Images Not Loading
- Product images returning 404 means they don't exist in your Kibo catalog
- Upload images in Kibo admin for each product
- Gray placeholder tiles will show for products without images

#### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` imports Tailwind directives
- Restart dev server after Tailwind config changes

### Environment Variables

#### Environment Variables Not Loading
- Restart your Next.js dev server after updating `.env.local`
- Ensure `.env.local` is in the project root directory (not in subdirectories)
- Check for typos in variable names (must match exactly)
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser code
- Server-side variables (like credentials) should NOT start with `NEXT_PUBLIC_`

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Kibo Commerce API Docs](https://docs.kibocommerce.com)

### Learning Resources
- [Next.js Learn Course](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Team Resources
- Kibo training materials
- Aries-UI component documentation
- Team coding standards and best practices

## Version Information

This project uses:
- **Next.js:** 15.x
- **React:** 19.x
- **TypeScript:** 5.x
- **Node.js:** 18.17+ required (20.x LTS recommended)

## Questions?

Reach out to your team lead or check the Kibo training materials for more information about the platform.

---

**Happy coding! 🚀**
