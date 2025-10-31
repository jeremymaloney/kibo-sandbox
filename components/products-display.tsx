"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import ProductDetailPage from "./product-detail-page";
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPdpOpen, setIsPdpOpen] = useState(false);

  const handleProductClick = (productCode: string) => {
    const product = products.find((p) => p.productCode === productCode);
    if (product) {
      setSelectedProduct(product);
      setIsPdpOpen(true);
    }
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    console.log(`Adding ${quantity} of product ${productId} to cart`);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = (productId: string, quantity: number) => {
    console.log(`Buying ${quantity} of product ${productId}`);
    alert(`Proceeding to checkout with ${quantity} item(s)!`);
    setIsPdpOpen(false);
  };

  // Get all product images
  const getProductImages = (product: Product) => {
    const images = product.content?.productImages?.map((img) =>
      getAbsoluteImageUrl(img.imageUrl)
    );
    return images && images.length > 0 ? images : undefined;
  };

  return (
    <>
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
                  fullDescription={stripHtml(
                    product.content?.productFullDescription
                  )}
                  price={product.price?.price}
                  salePrice={product.price?.salePrice}
                  originalPrice={product.price?.catalogListPrice}
                  image={
                    getAbsoluteImageUrl(
                      product.content?.productImages?.[0]?.imageUrl
                    ) || "No_image.svg"
                  }
                  images={getProductImages(product)}
                  inStock={product.purchasableState?.isPurchasable}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Page Modal */}
      {selectedProduct && (
        <ProductDetailPage
          open={isPdpOpen}
          onOpenChange={setIsPdpOpen}
          product={{
            id: selectedProduct.productCode,
            productCode: selectedProduct.productCode,
            name: selectedProduct.content?.productName,
            description: stripHtml(
              selectedProduct.content?.productShortDescription
            ),
            fullDescription: stripHtml(
              selectedProduct.content?.productFullDescription
            ),
            price: selectedProduct.price?.price,
            salePrice: selectedProduct.price?.salePrice,
            originalPrice: selectedProduct.price?.catalogListPrice,
            image:
              getAbsoluteImageUrl(
                selectedProduct.content?.productImages?.[0]?.imageUrl
              ) || "No_image.svg",
            imageAlt: selectedProduct.content?.productImages?.[0]?.altText,
            images: getProductImages(selectedProduct),
            inStock: selectedProduct.purchasableState?.isPurchasable,
            stockAvailable: selectedProduct.inventoryInfo?.onlineStockAvailable,
            rating: 4.5, // TODO: Get from Kibo reviews API
            reviewCount: 0, // TODO: Get from Kibo reviews API
          }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}
    </>
  );
}
