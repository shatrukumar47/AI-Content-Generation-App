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
          content: `Please summarize the given paragraph/article and try to make it brief but don't missout keywords and the meaning of article/paragraph. **${paragraph}**`,
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
          content: `Translate the following text into "${language}":  **${message}**.`,
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

app.listen(8080, () => {
  console.log("Server is live at Port 8080");
});

