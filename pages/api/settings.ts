const settings = {
  published: [
    {
      shop: "dev-subscriber.myshopify.com",
      status: "active",
      enabled: true,
      inventoryLocationId: "61576970293",
      updatedAt: "2021-12-03T05:14:10.140Z",
    },
  ],
  subscribed: [],
  publish: true,
};

export default function handler(req, res) {
  console.log("req.query ", req.body);

  const isPublished = req.body?.publish;

  if (req.method === "POST") {
    return res.status(200).json({ publish: isPublished });
  }
  // if (req.method === 'GET') { }

  // TODO: proxy actual api endpoint
  return res.status(200).json(settings);
}
