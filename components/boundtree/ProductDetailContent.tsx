"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { getAbsoluteImageUrl, stripHtml } from "@/utils";

interface ProductImgsType {
    imageUrl: string;
    altText: string;
}

interface ProductType {
    productCode: string;
    content: {
        productName: string;
        productFullDescription: string;
        productShortDescription?: string;
        productImages?: ProductImgsType[];
    };
    isActive: boolean;
    price: {
        price: number;
        salePrice?: number;
        catalogListPrice?: number;
    };
    productType: string;
    inventoryInfo?: {
        onlineStockAvailable: number;
        manageStock?: boolean;
    };
    purchasableState?: {
        isPurchasable?: boolean;
    };
    categories?: Array<{
        categoryId: number;
        content: {
            name: string;
            slug: string;
        };
    }>;
    properties?: Array<{
        attributeFQN: string;
        values?: Array<{
            value: string;
        }>;
    }>;
}

interface ProductDetailContentProps {
    product: ProductType;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState(false);

    // Get all product images
    const images = product.content.productImages?.map((img) =>
        getAbsoluteImageUrl(img.imageUrl)
    ) || ['/placeholder-image.jpg'];

    // Format price
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Handle quantity changes
    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    // Handle add to cart
    const handleAddToCart = () => {
        console.log(`Adding ${quantity} of ${product.productCode} to cart`);
        alert(`Added ${quantity} item(s) to cart!`);
    };

    // Get product properties for details section
    const getProductProperties = () => {
        if (!product.properties) return [];
        return product.properties.map((prop) => ({
            name: prop.attributeFQN.split('~').pop() || prop.attributeFQN,
            value: prop.values?.[0]?.value || 'N/A',
        }));
    };

    // Handle image error
    const handleImageError = () => {
        setImageError(true);
    };

    const currentPrice = product.price.salePrice || product.price.price;
    const hasDiscount = product.price.catalogListPrice && product.price.catalogListPrice > currentPrice;
    const stockAvailable = product.inventoryInfo?.onlineStockAvailable || 0;
    const inStock = product.purchasableState?.isPurchasable && stockAvailable > 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Image Gallery */}
                <div className="md:col-span-1">
                    {/* Main Image */}
                    <div className="relative bg-muted rounded-lg overflow-hidden mb-4 h-96 md:h-[500px]">
                        {!imageError ? (
                            <Image
                                src={images[selectedImage] || '/placeholder-image.jpg'}
                                alt={product.content.productImages?.[selectedImage]?.altText || product.content.productName}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                onError={handleImageError}
                                priority
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                <span className="text-base">Image unavailable</span>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative h-20 bg-muted rounded-md overflow-hidden border-2 transition-all ${
                                        selectedImage === index
                                            ? 'border-primary'
                                            : 'border-transparent hover:border-gray-300'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.content.productName} thumbnail ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="100px"
                                        onError={handleImageError}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="md:col-span-1">
                    {/* Product Name */}
                    <h1 className="text-3xl font-bold mb-4">{product.content.productName}</h1>

                    {/* Product Code/SKU */}
                    <div className="mb-4">
                        <span className="text-sm text-muted-foreground font-mono">
                            SKU: {product.productCode}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-4xl font-bold text-primary">
                                {formatPrice(currentPrice)}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-xl text-muted-foreground line-through">
                                        {formatPrice(product.price.catalogListPrice!)}
                                    </span>
                                    <Badge className="bg-highlight text-highlight-foreground hover:bg-highlight/90 font-bold">
                                        ON SALE
                                    </Badge>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-6">
                        {inStock ? (
                            <Badge className="bg-green-500 text-white">
                                In Stock {stockAvailable > 0 && `(${stockAvailable} available)`}
                            </Badge>
                        ) : (
                            <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                        )}
                    </div>

                    {/* Short Description */}
                    {product.content.productShortDescription && (
                        <div className="mb-6">
                            <p className="text-base text-foreground">
                                {stripHtml(product.content.productShortDescription)}
                            </p>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Quantity</label>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(1)}
                                disabled={!inStock || quantity >= stockAvailable}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mb-8">
                        <Button
                            size="lg"
                            className="w-full"
                            onClick={handleAddToCart}
                            disabled={!inStock}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                    </div>

                    {/* Product Type */}
                    {product.productType && (
                        <div className="mb-4 pb-4 border-b">
                            <span className="text-sm text-muted-foreground">
                                Product Type: <span className="font-medium text-foreground">{product.productType}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Full Description */}
            {product.content.productFullDescription && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                    <div className="prose max-w-none">
                        <p className="text-base text-foreground whitespace-pre-wrap">
                            {stripHtml(product.content.productFullDescription)}
                        </p>
                    </div>
                </div>
            )}

            {/* Product Details/Properties */}
            {product.properties && product.properties.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                    <div className="bg-muted rounded-lg p-6">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getProductProperties().map((prop, index) => (
                                <div key={index} className="border-b border-border pb-2">
                                    <dt className="text-sm font-medium text-muted-foreground mb-1">
                                        {prop.name}
                                    </dt>
                                    <dd className="text-base font-semibold text-foreground">
                                        {prop.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            )}

            {/* Additional Information */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                <div className="bg-muted rounded-lg p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-b border-border pb-2">
                            <dt className="text-sm font-medium text-muted-foreground mb-1">
                                Product Code
                            </dt>
                            <dd className="text-base font-semibold text-foreground font-mono">
                                {product.productCode}
                            </dd>
                        </div>
                        <div className="border-b border-border pb-2">
                            <dt className="text-sm font-medium text-muted-foreground mb-1">
                                Availability
                            </dt>
                            <dd className="text-base font-semibold text-foreground">
                                {inStock ? 'In Stock' : 'Out of Stock'}
                            </dd>
                        </div>
                        {product.inventoryInfo?.manageStock && (
                            <div className="border-b border-border pb-2">
                                <dt className="text-sm font-medium text-muted-foreground mb-1">
                                    Stock Management
                                </dt>
                                <dd className="text-base font-semibold text-foreground">
                                    Managed
                                </dd>
                            </div>
                        )}
                        <div className="border-b border-border pb-2">
                            <dt className="text-sm font-medium text-muted-foreground mb-1">
                                Status
                            </dt>
                            <dd className="text-base font-semibold text-foreground">
                                {product.isActive ? 'Active' : 'Inactive'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

