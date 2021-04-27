import { useState, useEffect, Fragment } from 'react'
import Header from './Header'
import Login from './Login'
import Articles from './Articles'
import UserArticles from './UserArticles'
import SearchStock from './SearchStock'
import socketIoClient from 'socket.io-client'

let socket = socketIoClient("http://127.0.0.1:3001");

const HomePage = () => {

    const [userId, setUserId] = useState(0);
    const [showLogin, setLoginView] = useState(true);
    const [showAddStock, setShowAddStock] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userArticles, setUserArticles] = useState([]);
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      (()=> {
        let articles = [];
        let userArticles = [];

        socket.on("data-ready", (data) => {
          setLoading(false)
          const parsedArrayData = JSON.parse(data);
          parsedArrayData.forEach((article) => {
            let obj = {};
            obj.symbol = article[0];
            obj.summary = article[1];
            obj.sentiment = article[2];
            obj.score = article[3];
            obj.url = article[4];
            articles.push(obj);
          });
          console.log("ART", articles);
          setArticles(articles);
        });

        socket.on("user-saved", (data) => {
          const { userName, id } = data.userInfo;
          (data.created === false) ? 
            alert(`Welcome back ${userName}. Logging in now`) : 
            alert(`Account created. Welcome ${userName}. Logging in now`);
          setUserId(id);
        });

        socket.on("user-retrieved", (data) => {
          console.log('DATA FROM LOGIN', data);
          if (!data.length) {
            alert('Please enter a valid username and password');
            return;
          }
          alert(`Welcome back ${data[0].userName}. Logging in now`)
          setUserId(data[0].id);
        });

      })()
    }, []);

    const saveUser = async (userInput) => {
      console.log('SIGN UP VIEW');
      socket.emit("user-save", userInput);
    }

    const getUser = async (userInput) => {
      console.log('LOGIN VIEW');
      socket.emit("get-user", userInput);
    }
  
    // Fetch All User's Stocks
    const fetchStocks = async (userId) => {
      console.log("FETCH user's articles", userId);
      socket.emit("userStocks-fetch", userId);
    }
  
    // Send ticker to back-end
    const searchStock = async ({ ticker }) => {
      console.log("SEARCH ticker", ticker);
      setLoading(true);
      socket.emit("data-fetch", ticker);
    }
  
    // Save Article
    const saveArticle = async (articleInfo) => {
      const articleWithUserId = Object.assign(articleInfo, { userId });
      console.log("SAVE article", articleWithUserId);
      socket.emit("article-save", articleWithUserId);
    }
  
    // Delete Stock
    const deleteArticle = async (id) => {
      console.log("DELETE id", id);
      socket.emit("delete-article", id);
    }

    return (
      <>
      {(!userId) ? 
        (<Fragment>
          <Header onPress={() => setLoginView(!showLogin)} showLogin={showLogin} />
          <Login getUser={getUser} saveUser={saveUser} showLogin={showLogin} />
          <p>Enter a stock or crypto ticker to find the latest news. Ten of the most recent news articles on the ticker will be compiled, summarized, and analyzed for sentiment. Use this information to become a smarter trader!</p>
        </Fragment>) :  
        (<Fragment>
          <Header onPress={() => setShowAddStock(!showAddStock)} showAdd={showAddStock} />
          <SearchStock searchStock={searchStock} loading={loading} setLoading={setLoading} userId={userId} />
          {(userArticles.length) ? 
              <UserArticles userArticles={userArticles} deleteArticle={deleteArticle} userId={userId} /> :
              <div>You do not have any saved articles. Search for ticker to find articles and sentiment around the input stock. Save that information if you'd like.</div>
          }
          {(articles.length) ? 
              <Articles articles={articles} saveArticle={saveArticle} /> : <div></div>
          }
        </Fragment>)}
      </>
    )
  }

  export default HomePage