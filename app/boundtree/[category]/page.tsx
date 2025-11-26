import React from "react";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
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
        `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/categories?startIndex=${startIndex}&pageSize=${pageSize}`,
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
      // console.log(`catsData page ${page}: `, catsData);
      allCategories = allCategories.concat(catsData.items);
      hasMore = catsData.pageCount > page;
      startIndex += pageSize;
      page++;
    }

    console.log(`Looking for category with slug: "${category}"`);
    console.log(`Total categories fetched: ${allCategories.length}`);

    const selectedCat = allCategories.find(
      (cat) => cat.content.slug === category
    );

    if (!selectedCat) {
      console.error(`Category not found with slug: "${category}"`);
      console.log('Available category slugs:', allCategories.map(cat => cat.content.slug));
      throw new Error(`Category not found: ${category}`);
    }

    console.log(`Found category ID: ${selectedCat.categoryId} for slug: "${category}"`);
    return selectedCat.categoryId;
  } catch (error) {
    console.log("Error getting category ID: ", error);
    return 1;
  }
};

const getProducts = async (catId: number): Promise<ProductType[] | undefined> => {
  try {
    console.log(`Fetching products for category ID: ${catId}`);
    const baseUrl = `http://localhost:${3000}`;
    const response = await fetch(`${baseUrl}/api/category/products/${catId}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch products: ${response.status} - ${errorText}`);
      return undefined;
    }

    const productsData = await response.json();
    console.log("productsData received: ", productsData);

    // The API returns an object with items array
    if (productsData.items && Array.isArray(productsData.items)) {
      return productsData.items;
    }

    return productsData;
  } catch (error) {
    console.error("Error getting products from category ID: ", error);
    return undefined;
  }
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const {category} = await params;

  console.log(`CategoryPage rendering for category: "${category}"`);

  const catId = await getCatId(category);
  console.log(`Retrieved category ID: ${catId}`);

  const products = await getProducts(catId);

  if(!products || products.length === 0) {
    return (
      <div>
        <h1>{capitalizeFirstLetter(category)} Category Page</h1>
        <p>No products found for this category.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{capitalizeFirstLetter(category)} Category Page</h1>
      <p>Found {products.length} product(s)</p>
      <div>
        {products.map((product) => (
          <div key={product.productCode}>
            <h2>{product.content.productName}</h2>
            <p>{product.content.productFullDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
