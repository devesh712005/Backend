const { Worker } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null, // 🔥 REQUIRED for BullMQ
});

const sendEmail = () => new Promise((res) => setTimeout(res, 5 * 1000));

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`Message received with id: ${job.id}`);
    console.log("Processing message");
    console.log(`Sending email to ${job.data.email}`);
    await sendEmail();
    console.log("Email sent");
  },
  { connection },
);

console.log("Worker is running...");
