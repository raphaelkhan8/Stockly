const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { callToPythonAsync, signInActivityLogger, formatAMPM } = require("./utils/serverHelpers");
const { saveUser, getUser, getArticles, deleteUser, saveArticle, deleteArticle } = require("./utils/dbHelpers");

const app = express();
const port = process.env.PORT || 3001;

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
    const savedUser = await saveUser(userInfo);
    const dateOb = new Date();
    const authInfo = {
      username: userInfo.userName,
      date: dateOb.toLocaleDateString(),
      time: formatAMPM(dateOb),
    }
    authInfo.firstTimeUser = savedUser.created; 
    signInActivityLogger(authInfo, "signup");
    socket.emit("user-saved", savedUser);
  })

  // Get user and their saved articles from database
  socket.on("get-user", async (userInfo) => {
    const dateOb = new Date();
    const authInfo = {
      username: userInfo.userName,
      date: dateOb.toLocaleDateString(),
      time: formatAMPM(dateOb)
    }
    let userArticles = [];
    const retrievedUser = await getUser(userInfo);
    if (retrievedUser.length) {
      authInfo.loggedIn = true
      signInActivityLogger(authInfo, "login");
      userArticles = await getArticles(retrievedUser[0].dataValues.id);
    } else {
      authInfo.loggedIn = false;
      signInActivityLogger(authInfo, "login");
    }
    socket.emit("user-retrieved", [retrievedUser[0], userArticles]);
  })

  // Fetch article summarizations/sentiment analysis
  socket.on("data-fetch", async (ticker) => {
    const data = await callToPythonAsync("./stock_summarizer.py", ticker);
    const stringifiedData = data.toString();
    socket.emit("data-ready", stringifiedData);
  });

  // Save article in database
  socket.on("article-save", async (articleInfo) => {
    const savedArticles = await saveArticle(articleInfo);
    socket.emit("article-saved", savedArticles);
  });

  // Delete article from database
  socket.on("delete-article", async (article) => {
    const remainingArticles = await deleteArticle(article);
    socket.emit("article-deleted", remainingArticles);
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
