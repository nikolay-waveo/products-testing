import { client, useSWR } from "helpers/api-client";
import { mutate } from "swr";

interface IShop {
  shop?: string;
  status?: string;
  inventoryLocationId?: string;
  enabled?: boolean;
  updatedAt?: string;
}

type TShopSettings = {
  publish: boolean;
};

interface TShopSettingsResult extends TShopSettings {
  published?: Array<IShop>;
  subscribed?: Array<IShop>;
}

function useGETShopSettings(shop: string): ({
  data: TShopSettingsResult,
  isLoading: boolean,
  isError: any,
}) {
  const { data, error} = useSWR(`/api/settings?shop=${shop}`);

  mutate(`/api/settings?shop=${shop}`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

/**
 * setShopSettings - Enable/Disable Shop publish mode
 *
 * @param {string} shop
 * @param {TShopSettings} settings
 * @returns
 */

async function useSETShopSettings(shop: string, settings: TShopSettings) {
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
    useGETShopSettings,
    useSETShopSettings,
  };
}
