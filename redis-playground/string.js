const client = require("./client");

async function init() {
  await client.expire("message:6", 10);
  await client.set("message:6", "Hey from nodejs");
  const result = await client.get("message:6");
  console.log("Result ->> ", result);
}

init();
