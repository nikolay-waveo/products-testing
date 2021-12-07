export default function handler(req, res) {
  // if (req.method === 'POST') { }
  // if (req.method === 'GET') { }

  console.log(" req.query ", req.query);

  // TODO: proxy actual api endpoint
  res.status(200).json({ status: "ok" });
}
