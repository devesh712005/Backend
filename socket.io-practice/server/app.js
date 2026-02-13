import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Helllo express");
});

io.on("connection", (socket) => {
  console.log("Id", socket.id);
  socket.on("message", (data) => {
    console.log(data);
    // console.log("User Disconnected", socket.id);
  });
  io.emit("new-message", "Axa naya message chahiye ");
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
