import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is alive");
});
app.post("/analyze", (req, res) => {
  const { address } = req.body;
  if (!address || !address.trim()) {
    return res.status(400).json({ error: "Address is Required!" });
  }
  console.log("Analyze request for:", address);
  res.json({
    verdict: "Avoid",
    riskLevel: "High risk",
    horizon: "None",
    reason: "Dev wallet holds 31% of the supply and liquidity is not locked.",
  });
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
