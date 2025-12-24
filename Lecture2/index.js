const express = require("express");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const userRoute = require("./routes/userRoute");
dotenv.config(); // loads variable declare in .env to perocess.env

const app = express(); //create an  express application instance used to initialize middleware,start server ,define routes
const PORT = process.env.PORT;

app.use(express.json());
app.use(logger); //logger runs for EVERY incoming request GET, POST, PUT, DELETE — all routes

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("/api/users", userRoute);

app.post("/log", (req, res) => {
  console.log("Headers", req.headers);
  console.log("Body", req.body);
  res.send("Logging request details");
});

app.get("/search", (req, res) => {
  const { keywords, page } = req.query; //Used to read query parameters from the URL and used for filter and searching
  console.log("keywords ", keywords, " page ", page);
  res.end(); //In Express, a response must always be sent to complete the request
});

app.get("/error", (req, res, next) => {
  const error = new Error("Something went wrong");
  next(error);
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

//unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
