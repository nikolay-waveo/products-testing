import { client } from "helpers/api-client";

export default async function handler(req, res) {
  let response = null;
  const { API_ENDPOINT } = process.env;
  const shop = req.body?.shop;

  // console.log(" shop ", shop);

  if (req.method === "PUT") {
    const domain = req.headers["x-shopify-shop-domain"];

    console.log("[POST] request body ", req.body);
    console.log("[POST] settings header domain ", domain);

    try {
      response = await client.put(`${API_ENDPOINT}/publish`, {
        headers: {
          "x-shopify-shop-domain": domain,
          "Content-Type": "application/json",
        },
        body: req.body,
      });
    } catch (e) {
      console.log(" error ", e);
    }

    return res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    return res.status(200).json([
      {
        shop: "dev-subscriber.myshopify.com",
        status: "active",
        enabled: true,
        inventoryLocationId: "61576970293",
        updatedAt: "2021-12-03T05:14:10.140Z",
      },
    ]);
  }

  // TODO: proxy actual api endpoint
  return res.status(200).json({ status: "ok" });
}
