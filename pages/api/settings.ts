// Fake  settings
export default function handler(req, res) {
  console.log("req.query ", req.query);

  if (req.method === "POST") {
    return res.status(200).json({ publish: true });
  }
  // if (req.method === 'GET') { }

  // TODO: proxy actual api endpoint
  return res.status(200).json({ status: "ok" });
}
