const client = require("./client");

async function init() {
  //   await client.lpush("message", 1);
  //   await client.lpush("message", 2);
  //   await client.lpush("message", 3);
  const result = await client.lpop("message");
  console.log(result);
}
init();
