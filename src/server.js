const http = require('http');
const server = http.createServer();
const { Server } = require("socket.io");
const io = new Server(server, {
    transports: ["websocket", "polling"]
});

const users = {};
io.on('connection', (socket) => {
    socket.on('username', (username) => {
        const user = {
            name: username,
            id: client.id
          };
          users[client.id] = user;
          io.emit("connected", user);
          io.emit("users", Object.values(users));
      });

    socket.on('message', (msg) => {
        io.emit("message", {
            text: message,
            date: new Date().toISOString(),
            user: users[client.id]
        });
    });

    socket.on('disconnect', () => {
        const username = users[client.id];
        delete users[client.id];
        io.emit("disconnected", client.id);
    });
  });

  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
  