import { stripHtml, getAbsoluteImageUrl } from "@/utils";

/**
 * Kibo Product structure from API
 */
export interface KiboProduct {
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

/**
 * Transformed product structure for UI components
 */
export interface TransformedProduct {
  id: string;
  productCode: string;
  name?: string;
  description?: string;
  fullDescription?: string;
  price?: number;
  salePrice?: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  imageAlt?: string;
  discount?: number;
  inStock?: boolean;
  images?: string[];
  stockAvailable?: number;
}

/**
 * Get all product images as absolute URLs
 */
function getProductImages(product: KiboProduct): string[] | undefined {
  const images = product.content?.productImages?.map((img) =>
    getAbsoluteImageUrl(img.imageUrl)
  );
  return images && images.length > 0 ? images : undefined;
}

/**
 * Transform Kibo product data to UI component format
 * 
 * This function converts the raw Kibo API product structure into a format
 * that's optimized for UI components (ProductCard, ProductDetailPage, etc.)
 * 
 * @param kiboProduct - Raw product data from Kibo API
 * @returns Transformed product data ready for UI components
 */
export function transformKiboProduct(kiboProduct: KiboProduct): TransformedProduct {
  return {
    id: kiboProduct.productCode,
    productCode: kiboProduct.productCode,
    name: kiboProduct.content?.productName,
    description: stripHtml(kiboProduct.content?.productShortDescription),
    fullDescription: stripHtml(kiboProduct.content?.productFullDescription),
    price: kiboProduct.price?.price,
    salePrice: kiboProduct.price?.salePrice,
    originalPrice: kiboProduct.price?.catalogListPrice,
    currency: "USD",
    image:
      getAbsoluteImageUrl(
        kiboProduct.content?.productImages?.[0]?.imageUrl
      ) || "No_image.svg",
    imageAlt: kiboProduct.content?.productImages?.[0]?.altText,
    images: getProductImages(kiboProduct),
    inStock: kiboProduct.purchasableState?.isPurchasable,
    stockAvailable: kiboProduct.inventoryInfo?.onlineStockAvailable,
    rating: 4.5, // TODO: Get from Kibo reviews API
    reviewCount: 0, // TODO: Get from Kibo reviews API
  };
}

/**
 * Transform multiple Kibo products
 * 
 * @param kiboProducts - Array of raw product data from Kibo API
 * @returns Array of transformed products ready for UI components
 */
export function transformKiboProducts(kiboProducts: KiboProduct[]): TransformedProduct[] {
  return kiboProducts.map(transformKiboProduct);
}

