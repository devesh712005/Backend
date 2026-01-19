import { config as conf } from "dotenv";
conf();
const_config = {
  port: process.env.PORT,
};
export const config = Object.freeze(_config);
