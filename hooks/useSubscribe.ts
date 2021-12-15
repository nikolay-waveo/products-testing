import { client } from "helpers/api-client";

type TSubscribeProps = {
  origin: string;
  subscriberShop: string;
  accept: boolean;
};

async function useSETShopSubscribeSettings(props: TSubscribeProps) {
  return await client.put(`api/subscribe`, {
    headers: {
      "x-shopify-shop-domain": `${props.origin}`,
    },
    body: JSON.stringify({
      accept: props?.accept,
      shop: props.subscriberShop,
    }),
  });
}

export function useSubscribe() {
  return {
    useSETShopSubscribeSettings,
  };
}
