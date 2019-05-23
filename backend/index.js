const server = require("express")();
const Twit = require("twit");
const socketIO = require("socket.io");
require("dotenv").config();
server.set("view engine", "pug");
const moment = require("moment");
const { push } = require("./database/index");

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET_KEY
  // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  // strictSSL: true // optional - requires SSL certificates to be valid.
});

const port = process.env.PORT || "4000";

const app = server.listen(port, () => {
  console.log("Server is listening at " + port);
});

const io = socketIO.listen(app);
io.on("connection", client => {
  console.log("user connected");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.get("/", (re1, res) => {
  res.send("hello world");
});

var stream = T.stream("statuses/filter", { track: "tradewar" });
let data = {
  time: moment()
    .startOf("minute")
    .toISOString(),
  count: 0
};
stream.on("tweet", async function(tweet) {
  // console.log(tweet);
  if (
    moment()
      .startOf("minute")
      .toISOString() !== data.time
  ) {
    console.log(data);
    push(data);
    io.sockets.emit("new-message", data);
    data.time = moment()
      .startOf("minute")
      .toISOString();
    data.count = 0;
  } else {
    data.count = data.count + 1;
  }
});
