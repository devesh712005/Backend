const express = require("express"); // Commonjs module loading is synchronous while es module is asynchronous by design. lods module one after another.

const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const { notFound } = require("./middleware/notFoundMiddleware");
const cookieParser = require("cookie-parser");
const app = express(); //Create express application instance that represent web server used to define routes, middleware.

dotenv.config(); // Loads variable declare in .env to process.env
app.use(express.json()); //data get parse and send to api
app.use(cookieParser()); //parse cookie from the
const PORT = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.send("Hello from backend server");
});

app.use("/api/auth", authRoute);

//centralized not found route middleware
app.use(notFound);

//centralized error middleqware
app.use(errorMiddleware);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running at ${PORT}`);
});
