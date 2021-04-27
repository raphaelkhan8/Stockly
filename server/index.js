const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { callToPythonAsync } = require("./utils/serverHelpers");
const { saveUser, getUser, getArticles, deleteUser, saveArticle, deleteArticle } = require("./utils/dbHelpers");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("client connected");

  // Save user in database
  socket.on("user-save", async (userInfo) => {
    console.log(userInfo);
    const savedUser = await saveUser(userInfo);
    socket.emit("user-saved", savedUser);
  })

  // Get user from database
  socket.on("get-user", async (userInfo) => {
    console.log(userInfo);
    const retrievedUser = await getUser(userInfo);
    if (retrievedUser.length) {
      const userArticles = await getArticles(retrievedUser[0].dataValues.id);
      console.log('USER ARTICLES', userArticles);
    }
    socket.emit("user-retrieved", retrievedUser);
  })

  // Fetch article summarizations/sentiment analysis
  socket.on("data-fetch", async (ticker) => {
    const data = await callToPythonAsync("./stock_summarizer.py", ticker);
    const stringifiedData = data.toString();
    socket.emit("data-ready", stringifiedData);
  });

  // Save article in database
  socket.on("article-save", async (articleInfo) => {
    console.log(articleInfo);
    const savedArticle = await saveArticle(articleInfo);
    // const stringifiedSaveArt = savedArticle.toString();
    socket.emit("article-saved", savedArticle);
  });

  socket.on('disconnection', () => {
    console.log('Client disconnected');
  })
});

server.listen(port, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('App listening at http://%s:%s', host, port);
});