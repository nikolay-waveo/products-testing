import { Button } from "@shopify/polaris";
import { client } from "helpers/api-client";
import { usePublish } from "hooks/usePublish";
import { useSettings } from "hooks/useSettings";
import { useEffect } from "react";

// todo: get shop dynamically
// const shop = "fe-dev-publisher.myshopify.com";
const shop = "dev-subscriber.myshopify.com";

// const ax = axios.create({
//   baseURL: "https://shopify.perkd.io/products-pubsub-app-dev",
//   // timeout: 1000,
// });

// https://products-perkd.com?shop=dev-pub instance 1
// https://products-perkd.com?shop=sub-pub instance 2

const Main = () => {
  const { useGetShopSettings, setShopSettings } = useSettings();
  const { setShopPublishSettings, deleteShopPublishSettings } = usePublish();

  // const { data } = useGetShopSettings(shop);

  // useEffect(() => {
  //   console.log("shop settings ", data);
  // }, [data]);

  // useEffect(() => {
  //   deleteShopPublishSettings({
  //     publisherShop: "joel-dev-subscriber.myshopify.com",
  //     subscriberShop: "dev-publisher.myshopify.com",
  //   }).then((res) =>
  //     console.log("delete shop publish settings response  ", res)
  //   );
  // }, [deleteShopPublishSettings]);

  // useEffect(() => {
  //   setShopPublishSettings({
  //     publisherShop: "joel-dev-subscriber.myshopify.com",
  //     subscriberShop: "dev-publisher.myshopify.com",
  //     accept: true,
  //   }).then((res) => console.log("set shop publish settings response  ", res));
  // }, [setShopPublishSettings]);

  useEffect(() => {
    client
      .put("https://shopify.perkd.io/products-pubsub-app-dev/subcribe", {
        headers: {
          "x-shopify-shop-domain": `${shop}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventoryLocationId: "62489591961",
          shop: "dev-subscriber.myshopify.com",
        }),
      })
      // .delete("https://shopify.perkd.io/products-pubsub-app-dev/publish", {
      //   headers: {
      //     "x-shopify-shop-domain": `${shop}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     shop: "dev-publisher.myshopify.com",
      //   }),
      // })
      // .put("https://shopify.perkd.io/products-pubsub-app-dev/publish", {
      //   headers: {
      //     "x-shopify-shop-domain": "dev-subscriber.myshopify.com",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     accept: true,
      //     shop: "dev-publisher.myshopify.com",
      //   }),
      // })
      .then((res) => console.log(" response ", res));
  }, []);

  return (
    <div className="flex flex-col p-10">
      <div className="flex mt-8">
        <Button primary> I am Polaris button </Button>
      </div>
    </div>
  );
};

export default Main;
