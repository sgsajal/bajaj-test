import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// BFHL POST endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const numbers = data.filter((item) => !isNaN(Number(item)));
  const alphabets = data.filter((item) => isNaN(Number(item)));
  const lowercaseAlphabets = alphabets.filter(
    (item) => item.length === 1 && item.toLowerCase() === item
  );
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || [];

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "sajal.garg2021@vitstudent.com",
    roll_number: "21BIT0402",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

// BFHL GET endpoint
app.get("/bfhl", (_, res) => {
  res.json({ operation_code: 1 });
});

ViteExpress.listen(app, Number(process.env.PORT) || 4000, () =>
  console.log(`Server is listening on port ${process.env.PORT || 4000}...`)
);
