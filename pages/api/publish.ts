export default function handler(req, res) {
  // if (req.method === 'POST') { }
  // if (req.method === 'GET') { }
  console.log(" req.body ", req.body);

  if (req.method === "PUT") {
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
