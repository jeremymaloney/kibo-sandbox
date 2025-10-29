import ProductCard from "./product-card";
import { stripHtml, getAbsoluteImageUrl } from "@/utils";

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
  return (
    <section className="py-theme-xl bg-muted">
      <div className="container mx-auto px-theme-lg">
        <h2 className="text-theme-3xl font-bold text-center mb-12 text-foreground">
          Product Catalog ({loading ? "..." : products.length} items)
        </h2>

        {loading ? (
          <div className="text-center text-muted-foreground text-theme-base">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted-foreground text-theme-base">
            <p>No products found in your Kibo catalog.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-theme-lg">
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
