import { client } from "helpers/api-client";

/**
 *
 * @param {any} req  - An instance of http.IncomingMessage
 * @param {any} res - An instance of http.ServerResponse
 *
 */
export default async function handler(req, res) {
  let response = null;

  const { API_ENDPOINT } = process.env;
  const shop = req.query?.shop;

  if (req.method === "POST") {
    console.info("[POST]:: settings ");
    const domain = req.headers["x-shopify-shop-domain"];

    console.log("[POST] request body ", req.body);
    console.log("[POST] settings header domain ", domain);

    try {
      response = await client.post(`${API_ENDPOINT}/settings`, {
        body: req.body,
        headers: {
          "x-shopify-shop-domain": `${domain}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(" error ", e);
    }

    return res.status(200).json(response);
  }

  if (!shop) {
    return res
      .status(200)
      .json({ status: "failed", error: "shop parameter is missing" });
  }

  // GET (default response)
  response = await client.get(`${API_ENDPOINT}/settings?shop=${shop}`);
  return res.status(200).json(response);
}
