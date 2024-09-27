const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

OPENAI_API_KEY = process.env.OPENAI_API_KEY;
PORT = 8080;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/random", async (req, res) => {
  try {
    const prompt =
      "Generate a short and funny random sentence. Only return the sentence with no additional text.";

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. creative and funny!",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 60,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const quote = response.data.choices[0].message.content.trim();

    res.json({ quote });
  } catch (error) {
    console.error(
      "Error generating sentence:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to generate sentence." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
