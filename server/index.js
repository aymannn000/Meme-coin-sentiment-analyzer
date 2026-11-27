import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";
import evidence from "./data/Evidence.js";

const app = express();
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
const MODEL = "openai/gpt-oss-120b";
const port = 3001;
const VERDICTS = ["Avoid", "Watch", "Consider"];
const RISK_LEVELS = ["High risk", "Medium risk", "Low risk"];
const HORIZONS = ["Short-term trade", "Long-term hold", "None"];

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is alive");
});
app.post("/analyze", async (req, res) => {
  const { address } = req.body;
  if (!address || !address.trim()) {
    return res.status(400).json({ error: "Address is Required!" });
  }
  console.log("Analyze request for:", address);

  const systemPrompt = `You are a careful crypto risk analyst. You judge a token using only the evidence provided, and you never invent facts.

Answer with only a JSON object and no other text, using exactly these four keys:
- verdict: one of "Avoid", "Watch" or "Consider"
- riskLevel: one of "High risk", "Medium risk" or "Low risk"
- horizon: one of "Short-term trade", "Long-term hold" or "None"
- reason: one plain sentence that explains the verdict
Rules:
- If verdict is "Avoid", horizon must be "None".
- Warning signs: social accounts that are only days old, posts with near-identical wording, liquidity that is not locked, a contract that can mint more tokens, and a small group of wallets holding most of the supply.
- Positive signs: locked liquidity, a contract that cannot mint, holders spread out widely, and posts from older accounts.
- Hype and engagement alone are never a reason to buy.
- If the evidence is missing or too thin to judge, choose "Watch" and say so in the reason.`;
  const userMessage = JSON.stringify({
    address: address.trim(),
    evidence: evidence,
  });

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.2,
    });
    const raw = completion.choices[0].message.content;
    console.log("AI reply:", raw);

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) {
      console.log("No JSON found in reply:", raw);
      return res.status(502).json({ error: "AI reply had no JSON" });
    }
    const piece = raw.slice(start, end + 1);

    let data;
    try {
      data = JSON.parse(piece);
    } catch (parseError) {
      console.log("Bad reply:", raw);
      return res.status(502).json({ error: "AI reply was not valid JSON" });
    }

    if (
      !VERDICTS.includes(data.verdict) ||
      !RISK_LEVELS.includes(data.riskLevel) ||
      !HORIZONS.includes(data.horizon) ||
      typeof data.reason !== "string" ||
      !data.reason.trim()
    ) {
      console.log("Invalid reply:", data);
      return res.status(502).json({ error: "AI reply had unexpected values" });
    }

    if (data.verdict === "Avoid" && data.horizon !== "None") {
      console.log("Fixed horizon for Avoid verdict");
      data.horizon = "None";
    }

    res.json({
      verdict: data.verdict,
      riskLevel: data.riskLevel,
      horizon: data.horizon,
      reason: data.reason,
    });
  } catch (error) {
    console.log("chat failed:", error);
    res.status(500).json({ error: "could not load chat" });
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
