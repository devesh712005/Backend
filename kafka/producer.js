import { kafka } from "./client.js";

async function init() {
  const producer = kafka.producer();
  console.log("Connecting producer");
  await producer.connect();
  console.log("Producer connected successfully");
  await producer.send({
    topic: "rider-update",
    messages: [
      {
        partition: 0,
        key: "location-update",
        value: JSON.stringify({ name: "Tony Stark", loc: "SOUTH" }),
      },
    ],
  });
  await producer.disconnect();
}
init();
