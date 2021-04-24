const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { callToPythonAsync } = require("./utils/helpers");

const app = express();
const port = 3001;

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("data-fetch", async (ticker) => {
    const data = await callToPythonAsync("./stock_summarizer.py", ticker);
    const stringifiedData = data.toString();
    socket.emit("data-ready", stringifiedData);
  });
  socket.on('disconnection', () => {
    console.log('Client disconnected');
  })
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});