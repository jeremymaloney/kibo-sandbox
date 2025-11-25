import React from "react";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

interface CategoryPageProps {
  params: { category: string };
}

interface CategoryResultType {
  categoryId: number;
  content: {
    name: string;
    slug: string;
  };
}

interface ProductImgType {
  altText: string;
  imageUrl: string;
}

interface ProductType {
  productCode: string;
  content: {
    productName: string;
    productFullDescription?: string;
    productImages?: [ProductImgType];
  };
  price: {
    price: number;
  };
}

const getCatId = async (category: string): Promise<number> => {
  try {
    const baseUrl =
      //   process.env.NEXT_PUBLIC_BASE_URL ||
      //   request.headers.get("origin") ||
      `http://localhost:${3000}`;

    const tokenResponse = await fetch(`${baseUrl}/api/auth/token`);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      throw new Error(errorData);
    }

    const tokenData = await tokenResponse.json();
    const accessToken: string = tokenData.accessToken;

    let allCategories: CategoryResultType[] = [];
    let page = 1;
    let hasMore = true;
    let startIndex = 0;
    const pageSize = 50;

    while (hasMore) {
      const catsResponse = await fetch(
        `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/categories?startIndex${startIndex}=&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
            "x-vol-site": `${SITE_ID}`,
          },
        }
      );

      if (!catsResponse.ok) {
        const errorData = await tokenResponse.text();
        throw new Error(errorData);
      }

      const catsData = await catsResponse.json();
      allCategories = allCategories.concat(catsData.items);
      hasMore = catsData.pageCount > page;
      startIndex += pageSize;
      page++;
    }

    const selectedCat = allCategories.find(
      (cat) => cat.content.slug === category
    );

    return selectedCat?.categoryId || 1;
  } catch (error) {
    console.log("Error getting category ID: ", error);
    return 1;
  }
};

// TODO:  FINISH THIS FUNCTION
const getProducts = async (catId: number): Promise<ProductType | undefined> => {
  try {
    const products = await fetch(`/api/category/products/${catId}`);
  } catch (error) {
    console.log("Error getting category ID: ", error);
    return undefined;
  }
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const {category} = params;
  // const catId = await getCatId(category);
  // const products = await getProducts(catId);

  return (
    <div>
      <h1>{category} Category Page</h1>
    </div>
  );
};

export default CategoryPage;
