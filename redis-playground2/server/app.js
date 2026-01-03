import express from "express";
import { getProducts } from "./api/products.js";
import { Redis } from "ioredis";

const app = express();
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => {
  console.log("Redis connected successfulyy");
});

app.get("/", (req, res) => {
  res.send("Hello from express");
});
app.get("/products", async (req, res) => {
  const cachedData = await redis.get("age");
  console.log(cachedData);
  if (cachedData) {
    console.log("Get from cached");
    return res.json({ message: JSON.parse(cachedData) });
  }
});
app.listen(3000, () => {
  console.log("Server is running on 3000");
});
