const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server); //Handle socket.io

//Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    //agr kisi fronend se msg aata h
    io.emit("message", message); //Tho baki sab ko de do
  });
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});
``;
server.listen(9000, () => {
  console.log("Server started at 9000");
});
