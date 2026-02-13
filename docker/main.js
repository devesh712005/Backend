const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  return res.json({ message: "hey i am nodejs in conatiner" });
});
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
