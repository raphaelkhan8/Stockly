import { useState, useEffect, Fragment } from 'react'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Articles from './Articles'
import UserArticles from './UserArticles'
import SearchStock from './SearchStock'
import socketIoClient from 'socket.io-client'
let socket;

const HomePage = () => {

    const [userId, setUserId] = useState('');
    const [showSignUp, setSignUpView] = useState(false); 
    const [showAddStock, setShowAddStock] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userArticles, setUserArticles] = useState([]);
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      (()=> {
        let articles = [];
        socket = socketIoClient("http://127.0.0.1:3001");
        socket.on("data-ready", (data) => {
          setLoading(false)
          const parsedArrayData = JSON.parse(data);
          parsedArrayData.forEach((article, i) => {
            let obj = {};
            obj.id = i++;
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
      })()
    }, []);

    const saveUser = async (userInfo) => {
      console.log("SAVE user info", userInfo);
      socket.emit("user-save", userInfo);
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
  
    // Add Article
    const addArticle = async (articleInfo) => {
      console.log("SAVE article", articleInfo);
      socket.emit("article-save", articleInfo);
    }
  
    // Delete Stock
    const deleteArticle = async (id) => {
      console.log("DELETE id", id);
      socket.emit("delete-article", id);
    }

    return (
      <>
      {(!userId && !showSignUp) ? 
        (<Fragment>
          <Header onSignUp={() => setSignUpView(!showSignUp)} showSignUp={showSignUp} />
          <Login setUserId={setUserId} saveUser={saveUser} />
        </Fragment>) : 
      (!userId && showSignUp) ?
        (<Fragment>
          <Header onSignUp={() => setSignUpView(!showSignUp)} showSignUp={showSignUp} />
          <Signup setUserId={setUserId} saveUser={saveUser} />
        </Fragment>) :   
        (<Fragment>
          <Header onAdd={() => setShowAddStock(!showAddStock)} showAdd={showAddStock} />
          <SearchStock searchStock={searchStock} loading={loading} setLoading={setLoading} />
         </Fragment>) }
      {
       (articles.length > 0) ? (
          <Articles
            articles={articles}
            addArticle={addArticle}
          />
       ) : <div></div>
      //   <UserArticles
      //   userArticles={userArticles}
      //   deleteArticle={deleteArticle}
      // />
      }
      </>
    )
  }

  export default HomePage