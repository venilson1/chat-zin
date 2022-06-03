const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.on("disconnect", () => console.log(`${socket.id} desconectou`));

  socket.on("message", (data) => {
    io.emit("responseMessage", data);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

httpServer.listen(port);
