const Redis = require("ioredis");

const client = new Redis(); //It will hit to by default server 6379

module.exports = client;
