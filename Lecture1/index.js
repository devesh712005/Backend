const express = require("express"); // Commonjs module loading is synchronous while es module is asynchronous by design. lods module one after another.

const dotenv = require("dotenv");

const app = express(); //Create express application instance that represent web server used to define routes, middleware.

dotenv.config(); // Loads variable declare in .env to process.env

const PORT = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.send("Hello from backend server");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
