const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.set("view engine", "ejs");

let messages = [];

io.on("connection", (socket) => {
  socket.on("disconnect", () => console.log(`${socket.id} desconectou`));

  io.emit("previousMessages", messages);

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("responseMessage", data);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

httpServer.listen(port);
