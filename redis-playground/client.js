const Redis = require("ioredis");
const client = new Redis(); // connects to localhost:6379

module.exports = client;
