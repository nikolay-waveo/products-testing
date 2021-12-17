import { client } from "helpers/api-client";

type TSubscribeProps = {
  origin: string;
  subscriberShop: string;
  accept?: boolean;
  id: string;
};

const { API_ENDPOINT } = process.env;

//! Needs inventoryLocationId
async function useSETShopSubscribeSettings(props: TSubscribeProps) {
  return await client.put(`${API_ENDPOINT}/subscribe`, {
    headers: {
      "x-shopify-shop-domain": `${props.origin}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accept: props?.accept,
      shop: props.subscriberShop,
      inventoryLocationId: props.id,
    }),
  });
}

async function useDELETEShopSubscribeSettings(props: Omit<TSubscribeProps, "accept">) {
  return await client.delete(`${API_ENDPOINT}/subscribe`, {
    headers: {
      "x-shopify-shop-domain": `${props.origin}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shop: props.subscriberShop,
    }),
  });
}

export function useSubscribe() {
  return {
    useSETShopSubscribeSettings,
    useDELETEShopSubscribeSettings,
  };
}
