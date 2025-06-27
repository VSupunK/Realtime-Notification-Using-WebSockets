require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const coockieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

app.use(coockieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

const URI = process.env.MONGO_UI;
mongoose.connect(
  URI,
  {
    userCreateIndex: true,
    useFindAndModify: false,
    userNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log("Listening on ", port);
});
