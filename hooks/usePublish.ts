import { client } from "helpers/api-client";

type TPublishProps = {
  origin: string;
  publisherShop: string;
  accept?: boolean;
};

const { API_ENDPOINT } = process.env;

async function useSETShopPublishSettings(props: TPublishProps) {
  return await client.put(`${API_ENDPOINT}/publish`, {
    headers: {
      "x-shopify-shop-domain": `${props.origin}`,
    },
    body: JSON.stringify({
      accept: props?.accept,
      shop: props.publisherShop,
    }),
  });
}

async function useDELETEShopPublishSettings(props: Omit<TPublishProps, "accept">) {
  return await client.delete(`${API_ENDPOINT}/publish`, {
    headers: {
      "x-shopify-shop-domain": `${props.origin}`,
    },
    body: JSON.stringify({
      shop: props.publisherShop,
    }),
  });
}

export function usePublish() {
  return {
    useSETShopPublishSettings,
    useDELETEShopPublishSettings,
  };
}
