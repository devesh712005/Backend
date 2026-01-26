const amqp = require("amqplib");

async function receiveMail() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("users_mail_queue", {
      durable: false,
    });
    channel.consume("users_mail_queue", (message) => {
      if (message !== null) {
        console.log("Rec message for normal user", JSON.parse(message.content));
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

receiveMail();
