import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.use(express.json());

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
    email: "john@xyz.com",
    roll_number: "ABCD123",
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

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
