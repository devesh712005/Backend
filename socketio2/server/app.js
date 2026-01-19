import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const PORT = 3000;

const app = express();
const server = createServer(app); //Because Socket.IO must attach to a raw HTTP server, not directly to the Express app.

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true, //alows fronend to send cookies send session/JWT cookies backend will accept it
  },
}); //It creates a Socket.IO SERVER

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  //   socket.emit("welcome", `welcome to server ${socket.id}`);
  socket.on("message", (data) => {
    console.log(data);
    io.emit("receive-message", data); // To all client it is send
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server connected successfully at ${PORT}`);
});
