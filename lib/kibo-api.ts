/**
 * Kibo Commerce API Utility
 * Provides reusable functions for authenticating and fetching data from Kibo entity lists
 */

const APP_KEY = process.env.KIBO_APP_KEY;
const SHARED_SECRET = process.env.KIBO_SHARED_SECRET;
const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

const AUTH_URL = 'https://home.usc1.gcp.kibocommerce.com/api/platform/applications/authtickets/oauth';

interface KiboAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface KiboEntityListResponse {
  items: any[];
  totalCount: number;
  pageCount?: number;
  pageSize?: number;
  startIndex?: number;
}

interface FetchEntityListOptions {
  entityListFullName: string;
  filter?: (items: any[]) => any[] | any;
  errorContext?: string;
}

/**
 * Authenticate with Kibo Commerce and get an access token
 */
async function authenticate(): Promise<string> {
  if (!APP_KEY || !SHARED_SECRET) {
    throw new Error('Missing Kibo credentials: KIBO_APP_KEY or KIBO_SHARED_SECRET');
  }

  const authResponse = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: APP_KEY,
      client_secret: SHARED_SECRET,
      grant_type: 'client_credentials',
    }),
  });

  if (!authResponse.ok) {
    const errorData = await authResponse.text();
    console.error('Kibo authentication failed:', errorData);
    throw new Error(`Authentication failed: ${errorData}`);
  }

  const authData: KiboAuthResponse = await authResponse.json();
  return authData.access_token;
}

/**
 * Fetch entities from a Kibo entity list
 */
export async function fetchEntityList(
  options: FetchEntityListOptions
): Promise<{ data: any; totalCount?: number }> {
  const { entityListFullName, filter, errorContext = 'entity list' } = options;

  if (!TENANT_ID || !SITE_ID) {
    throw new Error('Missing Kibo configuration: KIBO_TENANT_ID or KIBO_SITE_ID');
  }

  // Step 1: Authenticate
  const accessToken = await authenticate();

  // Step 2: Fetch entity list
  const entityListUrl = `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/platform/entitylists/${entityListFullName}/entities`;

  const response = await fetch(entityListUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`Failed to fetch ${errorContext}:`, errorData);
    throw new Error(`Failed to fetch ${errorContext}: ${errorData}`);
  }

  const responseData: KiboEntityListResponse = await response.json();

  // Step 3: Apply filter if provided
  let data: any;
  if (filter) {
    data = filter(responseData.items || []);
  } else {
    data = responseData.items || [];
  }

  // Return data with optional totalCount
  return {
    data,
    ...(Array.isArray(data) && { totalCount: responseData.totalCount || 0 }),
  };
}

/**
 * Fetch a single entity by ID from an entity list
 */
export async function fetchEntityById(
  entityListFullName: string,
  entityId: string,
  errorContext?: string
): Promise<{ data: any }> {
  return fetchEntityList({
    entityListFullName,
    filter: (items) => items.find((item) => item.id === entityId) || null,
    errorContext: errorContext || `entity with id: ${entityId}`,
  });
}

/**
 * Fetch all entities from an entity list
 */
export async function fetchAllEntities(
  entityListFullName: string,
  errorContext?: string
): Promise<{ data: any[]; totalCount: number }> {
  return fetchEntityList({
    entityListFullName,
    errorContext,
  }) as Promise<{ data: any[]; totalCount: number }>;
}

/**
 * Fetch products from Kibo Catalog API
 */
export async function fetchProducts(
  pageSize: number = 200,
  errorContext: string = 'products'
): Promise<{ data: any[]; totalCount: number }> {
  if (!TENANT_ID || !SITE_ID) {
    throw new Error('Missing Kibo configuration: KIBO_TENANT_ID or KIBO_SITE_ID');
  }

  // Step 1: Authenticate
  const accessToken = await authenticate();

  // Step 2: Fetch products from Catalog API
  const productsUrl = `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/products?pageSize=${pageSize}`;

  const response = await fetch(productsUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`Failed to fetch ${errorContext}:`, errorData);
    throw new Error(`Failed to fetch ${errorContext}: ${errorData}`);
  }

  const responseData = await response.json();

  return {
    data: responseData.items || [],
    totalCount: responseData.totalCount || 0,
  };
}

