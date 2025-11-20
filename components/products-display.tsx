"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import ProductDetailPage from "./product-detail-page";
import {
  transformKiboProduct,
  type KiboProduct,
} from "@/utils/product-transformer";

type ProductsDisplayProps = {
  products: KiboProduct[];
  loading: boolean;
};

export default function ProductsDisplay({
  products,
  loading,
}: ProductsDisplayProps) {
  const [selectedProduct, setSelectedProduct] = useState<KiboProduct | null>(
    null
  );
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
                  {...transformKiboProduct(product)}
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
          product={transformKiboProduct(selectedProduct)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}
    </>
  );
}
