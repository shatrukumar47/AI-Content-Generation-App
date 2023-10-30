const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

//Welcome
app.get("/", (req, res) => {
  res.status(400).send("Welcome to Gen/Chat-App-Backend");
});

//OpenAI Generation
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Chat
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: userMsg,
        },
      ],
      temperature: 1.5,
      max_tokens: 279,
      top_p: 1,
      frequency_penalty: 1.01,
      presence_penalty: 1.03,
    });
    // console.log(response.choices);
    res.status(200).send({ msg: response.choices[0].message.content });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//Summarization
app.post("/summary", async (req, res) => {
  const paragraph = req.body.message;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: `Please provide a concise summary of the key points, insights, and important details from the following multi-type documents/articles (list the document/article titles or content descriptions here). Summarize the content, highlighting any common themes or significant differences, and make sure to capture the most crucial information. Additionally, please analyze the overarching message or main takeaways. **${paragraph}**`,
        },
      ],
      temperature: 1.5,
      max_tokens: 279,
      top_p: 1,
      frequency_penalty: 1.01,
      presence_penalty: 1.03,
    });
    // console.log(response.choices);
    res.status(200).send({ msg: response.choices[0].message.content });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//Translation
app.post("/translation", async (req, res) => {
  const { message, language } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: `Translate the following message into [${language}]: '[${message}]'`,
        },
      ],
      temperature: 1,
      max_tokens: 1011,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).send({ msg: response.choices[0].message.content });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//sentiment analyses
app.post("/sentiment-analysis", async (req, res) => {
  const { userMsg, language } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a sentiment analysis model.",
        },
        {
          role: "user",
          content: `Please analyze the sentiment of the following text in [${language}] and provide the result with the keywords Positive, Negative or Neutral.`,
        },
        {
          role: "assistant",
          content: `[${userMsg}]`,
        },
      ],
      temperature: 1,
      max_tokens: 326,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).send({ msg: response.choices[0].message.content });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.listen(8080, () => {
  console.log("Server is live at Port 8080");
});
