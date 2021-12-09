// Fake  settings
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
  // if (req.method === 'POST') { }
  // if (req.method === 'GET') { }

  console.log(" req.query ", req.query);

  // TODO: proxy actual api endpoint
  res.status(200).json(settings);
}
