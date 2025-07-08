const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ⚠️ Check you have accepted the license terms of this model:
// https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

// POST /generate-image
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    console.log("🔹 Generating image for:", prompt);

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true },
      }),
    });

    // Handle API failure
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Hugging Face API error:", errorText);
      return res.status(500).json({ error: errorText || "Image generation failed." });
    }

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Fallback: Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
