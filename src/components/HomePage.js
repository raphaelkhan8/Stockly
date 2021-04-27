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
          if (!data.length) {
            alert('Please enter a valid username and password');
            return;
          }
          alert(`Welcome back ${data[0].userName}. Logging in now`)
          setUserId(data[0].id);
          setUserArticles(data[1]);
        });

        socket.on("article-saved", (data) => {
          if (!data.length) {
            alert('The article was unable to be saved');
            return;
          }
          alert(`The article and its info were saved`);
          articles = articles.filter(article => article.url !== data[data.length - 1].url);
          setArticles(articles);
          setUserArticles(data);
        });

        socket.on("article-deleted", (data) => {
          alert(`The article and its info were deleted`)
          setUserArticles(data);
        });

      })()
    }, []);

    const saveUser = async (userInput) => {
      socket.emit("user-save", userInput);
    }

    const getUser = async (userInput) => {
      socket.emit("get-user", userInput);
    }
  
    // Send ticker to back-end
    const searchStock = async ({ ticker }) => {
      setLoading(true);
      socket.emit("data-fetch", ticker);
    }
  
    // Save Article
    const saveArticle = async (articleInfo) => {
      const articleWithUserId = Object.assign(articleInfo, { userId });
      socket.emit("article-save", articleWithUserId);
    }
  
    // Delete Stock
    const deleteArticle = async (article) => {
      socket.emit("delete-article", article);
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
          <Header onPress={() => setShowAddStock(!showAddStock)} showAdd={showAddStock} loading={loading} />
          {showAddStock ? 
            (<Fragment>
              <SearchStock searchStock={searchStock} loading={loading} setLoading={setLoading} userId={userId} />
              {(articles.length) ? 
                (<Articles articles={articles} saveArticle={saveArticle} />) :
                <div>Search for a ticker to find summarized articles and sentiment analysis on the input stock. Save that information if you'd like.</div>
              }
            </Fragment>) :
            (userArticles.length) ? 
            <UserArticles userArticles={userArticles} deleteArticle={deleteArticle} userId={userId} /> : 
            <div>You do not have any saved articles. Search for a ticker to find summarized articles and sentiment analysis on the input stock. Save that information if you'd like.</div>
          }
        </Fragment>)}
      </>
    )
  }

  export default HomePage