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

app.get("/", async (req, res) => {
  const clientIp = req.ip;
  const key = `${clientIp}: request_count`;
  const requestCount = await redis.incr(key); //`${clientIp} : request_count` becomes key here and value = 0
  if (requestCount == 1) {
    await redis.expire(key, 60); // 60 sec max 10 req
  }
  const timeRemaining = await redis.ttl(key);
  if (requestCount > 10) {
    return res
      .status(429)
      .send(`Too many requests,Please try again after ${timeRemaining}`);
  }

  res.send("Hello from express");
});
app.get("/products", async (req, res) => {
  const cachedData = await redis.get("products");
  if (cachedData) {
    console.log("Get from cached");
    return res.json({ message: JSON.parse(cachedData) });
  }
  console.log("cached missed loading from source data");
  const data = await getProducts();
  console.log(data);
  console.log(data.products.name);
  await redis.set("products", JSON.stringify(data.products.name), "EX", 60);
  return res.json(data.products.name);
});
app.listen(3000, () => {
  console.log("Server is running on 3000");
});
