import express from "express";

const app = express();

//Routes
//Http methods get post put patch delete
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to elib apis" });
});

export default app;
