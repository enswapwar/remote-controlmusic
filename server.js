const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.static(__dirname));

let children = {};

io.on("connection", (socket) => {

  // 親が接続したら今の一覧を必ず送る
  socket.emit("children-list", Object.keys(children));

  // 子が確定したときのみ登録
  socket.on("register-child", () => {
    children[socket.id] = socket;
    io.emit("children-list", Object.keys(children));
  });

  socket.on("disconnect", () => {
    delete children[socket.id];
    io.emit("children-list", Object.keys(children));
  });

  socket.on("play", (id) => {
    children[id]?.emit("play");
  });

  socket.on("stop", (id) => {
    children[id]?.emit("stop");
  });

  socket.on("volume", ({ id, value }) => {
    children[id]?.emit("volume", value);
  });

});

server.listen(3000, () => {
  console.log("サーバーが起動したよ！");
});
