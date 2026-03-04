const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.static(__dirname));

let children = {}; 
// { socketId: { socket, name } }

function broadcastList() {
  const list = Object.entries(children).map(([id, data]) => ({
    id,
    name: data.name
  }));
  io.emit("children-list", list);
}

io.on("connection", (socket) => {

  socket.emit("children-list",
    Object.entries(children).map(([id, data]) => ({
      id,
      name: data.name
    }))
  );

  socket.on("register-child", (name) => {
    children[socket.id] = {
      socket,
      name: name || "NoName"
    };
    broadcastList();
  });

  socket.on("disconnect", () => {
    delete children[socket.id];
    broadcastList();
  });

  socket.on("play", (id) => {
    children[id]?.socket.emit("play");
  });

  socket.on("stop", (id) => {
    children[id]?.socket.emit("stop");
  });

  socket.on("volume", ({ id, value }) => {
    children[id]?.socket.emit("volume", value);
  });

});

server.listen(3000, () => {
  console.log("サーバーが起動したよ！");
});
