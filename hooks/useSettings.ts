import { client, useSWR } from "helpers/api-client";

interface IShop {
  shop?: string;
  status?: string;
  inventoryLocationId?: string;
  enabled?: boolean;
  updatedAt?: string;
}

type TShopSettings = {
  publish: boolean;
  published?: Array<IShop>;
  subscribed?: Array<IShop>;
};

function useGetShopSettings(shop: string) {
  const { data, error } = useSWR(`/api/settings?shop=${shop}`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

async function setShopSettings(shop: string, settings: TShopSettings) {
  return await client.post(`api/settings`, {
    headers: {
      "x-shopify-shop-domain": `${shop}`,
    },
    body: JSON.stringify({
      ...settings,
    }),
  });
}

export function useSettings() {
  return {
    useGetShopSettings,
    setShopSettings,
  };
}
