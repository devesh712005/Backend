const { Queue } = require("bullmq");

const notificationQueue = new Queue("email-queue");

async function init() {
  const res = await notificationQueue.add("email to piyush", {
    email: "dschauhan@gmail.com",
    subject: "Welcome msg",
    body: "Hey devesh welcome to platform",
  });
  console.log("Job added to queue", res.id);
}

init();
