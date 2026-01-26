const amqp = require("amqplib");

async function sendMail() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "mail_exchange";
    const routingKeyForSubUser = "send_mail_to_subscribe_users";
    const routingKeyForNormalUser = "send_mail_to_users";
    const message = {
      to: "misthi8987@gmail.com",
      from: "2k23.it1a.2310619@gmail.com",
      subject: "Hello misthi",
      body: "Thank you bawa!",
    };

    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.assertQueue("subscribed_users_mail_queue", {
      durable: false,
    });
    await channel.assertQueue("users_mail_queue", { durable: false });

    await channel.bindQueue(
      "subscribed_users_mail_queue",
      exchange,
      routingKeyForSubUser,
    );
    await channel.bindQueue(
      "users_mail_queue",
      exchange,
      routingKeyForNormalUser,
    );

    channel.publish(
      exchange,
      routingKeyForSubUser,
      Buffer.from(JSON.stringify(message)),
    ); //All depends here where to send

    console.log("Mail data was send", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

sendMail();
