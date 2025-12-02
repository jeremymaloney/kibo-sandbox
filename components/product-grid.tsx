"use client";

import { useRouter } from "next/navigation";
import ProductCard from "@/components/product-card";
import { stripHtml } from "@/utils/text";
import { getAbsoluteImageUrl } from "@/utils/image";

interface ProductImgType {
    altText: string;
    imageUrl: string;
}

interface CategoriesType {
    categoryId: number;
    content: {
        name: string;
        slug: string;
    };
}

interface ProductType {
    productCode: string;
    content: {
        productName: string;
        productFullDescription?: string;
        productShortDescription?: string;
        productImages?: ProductImgType[];
    };
    price: {
        price: number;
        salePrice?: number;
        catalogListPrice?: number;
    };
    purchasableState?: {
        isPurchasable?: boolean;
    };
    categories?: CategoriesType[];
}

interface ProductGridProps {
    products: ProductType[];
    categorySlug: string;
}

/**
 * Gets the first N words from a string
 */
const getFirstWords = (text: string, wordCount: number): string => {
    const words = text.trim().split(/\s+/);
    return words.slice(0, wordCount).join(' ') + (words.length > wordCount ? '...' : '');
};

export default function ProductGrid({ products, categorySlug }: ProductGridProps) {
    const router = useRouter();

    const handleProductClick = (productCode: string) => {
        router.push(`/boundtree/${categorySlug}/${productCode}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
                // Get description - prefer short description, fallback to full description
                const rawDescription = product.content.productShortDescription || product.content.productFullDescription || '';
                const cleanDescription = stripHtml(rawDescription);
                const truncatedDescription = getFirstWords(cleanDescription, 7);

                return (
                    <ProductCard
                        key={product.productCode}
                        id={product.productCode}
                        name={product.content.productName}
                        description={truncatedDescription}
                        price={product.price.price}
                        salePrice={product.price.salePrice}
                        originalPrice={product.price.catalogListPrice}
                        image={getAbsoluteImageUrl(product.content.productImages?.[0]?.imageUrl) || '/placeholder-image.jpg'}
                        imageAlt={product.content.productImages?.[0]?.altText || product.content.productName}
                        inStock={product.purchasableState?.isPurchasable ?? true}
                        onClick={handleProductClick}
                    />
                );
            })}
        </div>
    );
}

