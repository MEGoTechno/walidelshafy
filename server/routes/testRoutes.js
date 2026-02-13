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

module.exports = router;
