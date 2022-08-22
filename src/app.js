require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

require('./controllers/authController')(app)
require('./controllers/adminController')(app)
require('./controllers/publicController')(app)
require('./controllers/messageController')(app)
require('./controllers/confirmationController')(app)
require('./controllers/askHelpController')(app)
require('./controllers/doPartController')(app)

let messages = [];

io.on("connection", (socket) => {
  socket.on("disconnect", () => console.log(`${socket.id} desconectou`));

  io.emit("previousMessages", messages);

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("responseMessage", data);
  });
});

app.get("/chat", (req, res) => {
  res.json({ msg: "test" })
});


require('./controllers/authController')(app)
require('./controllers/adminController')(app)
require('./controllers/publicController')(app)
require('./controllers/messageController')(app)
require('./controllers/confirmationController')(app)
require('./controllers/askHelpController')(app)
require('./controllers/doPartController')(app)

httpServer.listen(port);
