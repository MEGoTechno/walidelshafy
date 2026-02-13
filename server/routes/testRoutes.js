const router = require("express").Router();
const dotenv = require("dotenv");

const expressAsyncHandler = require("express-async-handler");
const { addToVimeo } = require("../middleware/upload/cloudinary");
const { upload } = require("../middleware/storage");
const UserModel = require("../models/UserModel");
const UAParser = require("ua-parser-js");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const { user_roles } = require("../tools/constants/rolesConstants");
const createError = require("../tools/createError");
const { FAILED } = require("../tools/statusTexts");

dotenv.config();

router.use(
  expressAsyncHandler(async (req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      next();
    } else {
      next(createError("Not Found Page", 404, FAILED));
    }
  }),
);

const tokenHuggingFace = "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";

router.post("/ai/format-failed", async (req, res) => {
  try {
    const text = req.body;

    const hfRes = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenHuggingFace}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-7b-it",
          messages: [
            {
              role: "user",
              content: `Convert this text into JSON: { "title": "", "hints": "", "image": "", "rtOptionId": "", "options": [{"title": ""}] } Text: ${text} Return JSON only.`,
            },
          ],
          max_tokens: 500,
          temperature: 0.1,
        }),
      },
    );

    console.log("hfRes ==>", hfRes);
    const data = await hfRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/",
  upload.single("file"),
  expressAsyncHandler(async (req, res, next) => {
    const file = req.file;

    const video = await addToVimeo(file);

    res.json(video);
  }),
);

router.get("/", verifyToken(true), async (req, res, next) => {
  try {
    // Get the user-agent string from the request headers
    const userAgent = req.headers["user-agent"];

    // Parse the user-agent string
    const parser = new UAParser();
    const result = parser.setUA(userAgent).getResult();

    return res.json({ device: result, userAgent });
    const users = await UserModel.find({});
    const count = await UserModel.countDocuments({});
    res.json({ msg: "done", values: { users, count } });
  } catch (error) {
    console.log("error");
    const err = new Error();
    err.message = "Failed";
    next(err);
  }
});

const fs = require("fs");

async function extract() {
  // IMPORTANT: use legacy build in Node
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  const data = new Uint8Array(
    fs.readFileSync("storage/Family Medicine Midterm MCQs - Dr. Elsum.pdf"),
  );

  const pdf = await pdfjsLib.getDocument({
    data: data,
    disableFontFace: true,
    disableAutoFetch: true,
    disableStream: true,
    isEvalSupported: false,
    useSystemFonts: true, // Use system fonts instead of embedded ones
  }).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const text = content.items.map((item) => item.str).join(" ");
    console.log(`Page ${i}:`, text);
  }
}

// extract();

router.post("/format/pdf", async (req, res) => {});

const groq = "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";
router.post("/ai/format", async (req, res) => {
  try {
    const { text } = req.body;

    // ✅ Groq API - works immediately with free tier
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groq}`, // Get free key: https://console.groq.com
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", // ✅ This works for everyone llama-3.3-70b-versatile groq/compound
          messages: [
            {
              role: "system",
              content: `You are a JSON formatter. Always return valid JSON only. extract only questions with options from this html and keep html tags and convert them into a structured JSON array of questions with options, If u detected the true option add isCorrect to the correct option, Each question should have this format: { "title": "", "image": "",  "options": [{"title": ""}] } html tags: ${text}`,
            },
            {
              role: "user",
              content: `Convert this html to a JSON array of questions with keeping html tags in each question and options: ${text}`,
            },
          ],
          temperature: 0.1,
          // max_tokens: 4000,
          response_format: { type: "json_object" },
        }),
      },
    );

    const data = await response.json();
    // console.log("data ==>", data);

    if (data.choices && data.choices[0]) {
      const jsonString = data.choices[0].message.content;
      try {
        const jsonData = JSON.parse(jsonString);
        res.json(jsonData);
      } catch (parseError) {
        res.json({
          error: "JSON parse failed",
          raw: jsonString,
          structured: parseManually(text),
        });
      }
    } else {
      res.json({ error: "No response from Groq", data });
    }
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
