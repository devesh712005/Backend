const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Mongodb atlas connected successfully ? ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      "Failed to connect mongodb connection error : ",
      error.message
    );
    process.exit(1); //exit server immediately
  }
};

module.exports = connectDb;
