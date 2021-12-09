import { client } from "helpers/api-client";

type TPublishProps = {
  publisherShop: string;
  subscriberShop: string;
  accept: boolean;
};

async function setShopPublishSettings(props: TPublishProps) {
  return await client.put(`api/publish`, {
    headers: {
      "x-shopify-shop-domain": `${props.publisherShop}`,
    },
    body: JSON.stringify({
      accept: props?.accept,
      shop: props.subscriberShop,
    }),
  });
}

export function usePublish() {
  return {
    setShopPublishSettings,
  };
}
