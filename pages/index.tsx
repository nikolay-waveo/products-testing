import { Button } from "@shopify/polaris";
import { useSettings } from "hooks/useSettings";
import { useEffect, useState } from "react";

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
  const { data } = useGetShopSettings(shop);

  const [domain, setDomain] = useState("");

  // useEffect(() => {
  //   console.log("data ", data);
  // }, [data]);

  useEffect(() => {
    setShopSettings(shop, { publish: true }).then((res) =>
      console.log("set shop settings result  ", res)
    );
  }, [setShopSettings]);

  return (
    <div className="flex flex-col p-10">
      <div className="mb-8 p-4 flex">
        <span className="mr-4"> x-shopify-domain </span>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>
      <div className="flex mt-8">
        <Button primary> I am Polaris button </Button>
      </div>
    </div>
  );
};

export default Main;
