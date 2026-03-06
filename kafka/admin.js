import { kafka } from "./client.js";

async function init() {
  const admin = kafka.admin();

  console.log("Admin Connecting...");
  await admin.connect();

  console.log("Admin Connection success");
  console.log("Creating topic [rider-updates]");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-update",
        numPartitions: 2,
      },
    ],
  });

  console.log("Topics create success");
  console.log("Admin disconnecting...");

  await admin.disconnect();
}

init();
