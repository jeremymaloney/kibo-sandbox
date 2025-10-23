import { useState } from "react";

// Product structure
interface Product {
  productCode: string;
  productSequence?: number;
  productType?: string;
  productTypeId?: number;
  productUsage?: string;
  publishState?: string;
  goodsType?: string;
  isActive?: boolean;
  isTaxable?: boolean;
  isRecurring?: boolean;
  isPackagedStandAlone?: boolean;
  createDate?: string;
  updateDate?: string;
  dateFirstAvailableInCatalog?: string;
  daysAvailableInCatalog?: number;
  costPriceMargin?: number;
  personalizationScore?: number;
  score?: number;
  slicingAttributeFQN?: string;

  content?: {
    productName?: string;
    productShortDescription?: string;
    productFullDescription?: string;
    productImages?: Array<{
      imageUrl?: string;
      altText?: string;
      cmsId?: string;
      sequence?: number;
      productImageGroupId?: string;
    }>;
  };

  price?: {
    price?: number;
    salePrice?: number;
    catalogListPrice?: number;
    effectivePricelistCode?: string;
    priceListEntryCode?: string;
    priceListEntryEndDate?: string;
    priceListEntryMode?: string;
    priceType?: string;
  };

  inventoryInfo?: {
    onlineStockAvailable?: number;
    manageStock?: boolean;
    outOfStockBehavior?: string;
    onlineSoftStockAvailable?: number;
    onlineLocationCode?: string;
  };

  categories?: Array<{
    categoryId: number;
    categoryCode?: string;
    sequence?: number;
    parentCategory?: Record<string, unknown>;
    content?: Record<string, unknown>;
  }>;

  measurements?: {
    packageHeight?: Record<string, unknown>;
    packageWidth?: Record<string, unknown>;
    packageLength?: Record<string, unknown>;
    packageWeight?: Record<string, unknown>;
  };

  pricingBehavior?: {
    discountsRestricted?: boolean;
  };

  purchasableState?: {
    isPurchasable?: boolean;
  };

  fulfillmentTypesSupported?: string[];
  productCollections?: unknown[];
  productImageGroups?: unknown[];
  properties?: Array<Record<string, unknown>>;
}

type ProductsDisplayProps = {
  products: Product[];
  loading: boolean;
};

export default function ProductsDisplay({
  products,
  loading,
}: ProductsDisplayProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (productCode: string) => {
    setImageErrors((prev) => new Set(prev).add(productCode));
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
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const hasImage = product.content?.productImages?.[0]?.imageUrl;
              const imageUrl = hasImage ? `https:${hasImage}` : null;
              const showImage =
                imageUrl && !imageErrors.has(product.productCode);

              return (
                <div
                  key={product.productCode}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  {/* Product Image or Placeholder */}
                  {showImage ? (
                    <img
                      src={imageUrl}
                      alt={product.content?.productName || "Product"}
                      className="w-full h-48 object-cover rounded mb-4"
                      onError={() => handleImageError(product.productCode)}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}

                  {/* Product Info */}
                  <h3 className="font-semibold text-lg mb-2">
                    {product.content?.productName || "Unnamed Product"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Code: {product.productCode}
                  </p>
                  {product.price?.price && (
                    <p className="text-lg font-bold text-blue-600">
                      ${product.price.salePrice || product.price.price}
                    </p>
                  )}
                  {product.inventoryInfo?.onlineStockAvailable !==
                    undefined && (
                    <p className="text-sm text-gray-500 mt-2">
                      {product.inventoryInfo.onlineStockAvailable > 0
                        ? `In Stock: ${product.inventoryInfo.onlineStockAvailable}`
                        : "Out of Stock"}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
