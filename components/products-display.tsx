import ProductCard from "./product-card";

// Product structure
interface Product {
  productCode: string;
  productType?: string;
  productTypeId?: number;
  isActive?: boolean;
  isTaxable?: boolean;

  content?: {
    productName?: string;
    productShortDescription?: string;
    productFullDescription?: string;
    productImages?: Array<{
      imageUrl?: string;
      altText?: string;
    }>;
  };

  price?: {
    price?: number;
    salePrice?: number;
    catalogListPrice?: number;
  };

  inventoryInfo?: {
    onlineStockAvailable?: number;
    manageStock?: boolean;
    outOfStockBehavior?: string;
    onlineSoftStockAvailable?: number;
    onlineLocationCode?: string;
  };

  purchasableState?: {
    isPurchasable?: boolean;
  };
}

type ProductsDisplayProps = {
  products: Product[];
  loading: boolean;
};

export default function ProductsDisplay({
  products,
  loading,
}: ProductsDisplayProps) {
  const getAbsoluteImageUrl = (url?: string): string => {
    if (!url) return "/placeholder-image.jpg";
    if (url.startsWith("//")) return `https:${url}`;
    return url;
  };

  const stripHtml = (html?: string): string => {
    if (!html) return "";
    // Remove HTML tags
    let text = html.replace(/<[^>]*>/g, "");
    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'");
    // Clean up extra whitespace (multiple spaces, newlines, etc.)
    text = text.replace(/\s+/g, " ").trim();
    return text;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Product Catalog ({loading ? "..." : products.length} items)
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No products found in your Kibo catalog.</p>
          </div>
        ) : (
          <div className="grid sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.productCode}
                id={product.productCode}
                name={product.content?.productName}
                description={stripHtml(
                  product.content?.productShortDescription
                )}
                price={product.price?.price}
                image={
                  getAbsoluteImageUrl(
                    product.content?.productImages?.[0]?.imageUrl
                  ) || "No_image.svg"
                }
                inStock={product.purchasableState?.isPurchasable}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
