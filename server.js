import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',  // Optional if you're using OpenAI's standard endpoint
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

app.listen(10000, () => {
  console.log("Chatbot backend running on port 10000");
});
