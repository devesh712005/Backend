const client = require("./client");

async function init() {
  const result = await client.get("message:3");
  console.log("Result ->> ", result);
}

init();
