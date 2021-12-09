import { Button } from "@shopify/polaris";
import { client } from "helpers/api-client";
import { useSettings } from "hooks/useSettings";
import { useEffect } from "react";

// todo: get shop dynamically
const shop = "dev-publisher.myshopify.com";

const Main = () => {
  const { data } = useSettings(shop);

  useEffect(() => {
    console.log("data ", data);
  }, [data]);

  useEffect(() => {
    client
      .post("/api/settings", {
        body: JSON.stringify({ publish: true }),
      })
      .then((res) => console.log("res ", res));
  }, []);

  return (
    <div className="flex flex-col p-10">
      <div className="mb-8 p-4 ">
        <button className="border p-8 rounded-md shadow-lg">
          Hey Tailwind!
        </button>
      </div>
      <div className="flex mt-8">
        <Button primary> I am Polaris button </Button>
      </div>
    </div>
  );
};

export default Main;
