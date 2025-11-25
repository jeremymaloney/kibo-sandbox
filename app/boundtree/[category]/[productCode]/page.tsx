import BTBreadcrumb from "@/components/boundtree/BTBreadcrumb";
import React from "react";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

interface ProductImgsType {
  imageUrl: string;
  altText: string;
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
    productFullDescription: string;
    productImages?: [ProductImgsType];
  };
  isActive: boolean;
  price: {
    price: number;
  };
  productType: string;
  inventoryInfo?: {
    onlineStockAvailable: number;
  };
  categories?: [CategoriesType];
}

interface PDPProps {
  params: { category?: string; productCode: string };
}

const getProduct = async (productCode: string) => {
  try {
    const baseUrl =
          //   process.env.NEXT_PUBLIC_BASE_URL ||
          //   request.headers.get("origin") ||
          `http://localhost:${3000}`;
    
        const tokenResponse = await fetch(`${baseUrl}/api/auth/token`);
    
        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.text();
          console.log("error getting access token for getProduct: ", errorData);
        }
    
        const tokenData = await tokenResponse.json();
        const accessToken: string = tokenData.accessToken;
    
        const prodResponse = await fetch(
          `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/products/${productCode}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json",
              "x-vol-site": `${SITE_ID}`,
            },
          }
        );
    
        if (!prodResponse.ok) {
          const errorData = await prodResponse.text();
          console.error("Get Product search failed:", errorData);
        }
    
        const prodData = prodResponse.json();
        console.log("prodData: ", prodData);

        return prodData;
  } catch (error) {
    console.log("Error fetching product:", error);
  }
};

const PDP = async ({ params }: PDPProps) => {
  const { productCode } = await params;
  const product: ProductType = await getProduct(productCode);
  let prodCat = "";
  let catSlug = "";

  if (!product) {
    return <p>Product not found.</p>
  }

  if (product.categories) {
    prodCat = product.categories[0].content.name;
    catSlug = product.categories[0].content.slug;
  }

  return (
    <div>
      <BTBreadcrumb
        currentPage={product.content.productName}
        category={prodCat}
        categorySlug={catSlug}
      />
      <h1>{product.content.productName}</h1>
    </div>
  );
};

export default PDP;
