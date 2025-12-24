const express = require("express"); // Commonjs module loading is synchronous while es module is asynchronous by design. lods module one after another.

const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const app = express(); //Create express application instance that represent web server used to define routes, middleware.

dotenv.config(); // Loads variable declare in .env to process.env
app.use(express.json()); //data get parse and send to api
const PORT = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.send("Hello from backend server");
});

app.use("/api", userRoute);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running at ${PORT}`);
});
