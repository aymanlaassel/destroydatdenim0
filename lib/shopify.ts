const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2024-10";

export function shopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

async function storefront<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error("store not configured");
  }
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`storefront request failed (${res.status})`);
  }
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("empty storefront response");
  }
  return json.data;
}

type VariantNode = {
  id: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};

/**
 * Look up a Shopify variant by product handle (== our slug) and size.
 * Matching is case-insensitive so "S"/"s" and spacing differences don't break it.
 * Returns the variant's global id, or null if not found / sold out.
 */
export async function getVariantId(
  handle: string,
  size: string
): Promise<string | null> {
  const data = await storefront<{
    product: { variants: { nodes: VariantNode[] } } | null;
  }>(
    `query VariantByHandle($handle: String!) {
      product(handle: $handle) {
        variants(first: 50) {
          nodes {
            id
            availableForSale
            selectedOptions { name value }
          }
        }
      }
    }`,
    { handle }
  );

  const variants = data.product?.variants.nodes ?? [];
  const target = size.trim().toLowerCase();
  const match = variants.find((v) =>
    v.selectedOptions.some((o) => o.value.trim().toLowerCase() === target)
  );
  if (!match || !match.availableForSale) return null;
  return match.id;
}

/**
 * Create a cart holding a single variant and return the Shopify-hosted
 * checkout URL to redirect the customer to.
 */
export async function createCheckoutUrl(
  variantId: string,
  quantity = 1
): Promise<string> {
  const data = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length) {
    throw new Error(userErrors.map((e) => e.message).join("; "));
  }
  if (!cart?.checkoutUrl) {
    throw new Error("could not create checkout");
  }
  return cart.checkoutUrl;
}
