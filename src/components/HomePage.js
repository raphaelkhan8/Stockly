import { useState, useEffect, Fragment } from 'react'
import Swal from 'sweetalert2'
import Header from './Header'
import Login from './Login'
import Articles from './Articles'
import UserArticles from './UserArticles'
import SearchStock from './SearchStock'
import socketIoClient from 'socket.io-client'

// let socket = socketIoClient("http://127.0.0.1:3001");
let socket = socketIoClient("https://stockly7.herokuapp.com:51073");

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
            obj.time = article[1];
            obj.summary = article[2];
            obj.sentiment = article[3];
            obj.score = article[4];
            obj.url = article[5];
            articles.push(obj);
          });
          setArticles(articles);
        });

        socket.on("user-saved", (data) => {
          const { userName, id } = data.userInfo;
          (data.created === false) ? 
            Swal.fire(`Welcome back ${userName}!`) : 
            Swal.fire(`Account created. Welcome ${userName}!`);
          setUserId(id);
        });

        socket.on("user-retrieved", (data) => {
          if (!data[0]) {
            Swal.fire('Please enter a valid username and password');
            return;
          }
          Swal.fire(`Welcome back ${data[0].userName}!`)
          setUserId(data[0].id);
          setUserArticles(data[1]);
        });

        socket.on("article-saved", (data) => {
          if (!data.length) {
            Swal.fire('The article was unable to be saved');
            return;
          }
          Swal.fire(`The article was saved`);
          articles = articles.filter(article => article.url !== data[data.length - 1].url);
          setArticles(articles);
          setUserArticles(data);
        });

        socket.on("article-deleted", (data) => {
          Swal.fire(`The article was deleted`)
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
      Swal.fire({
        title: 'Are you sure you want to delete this article?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("delete-article", article);
        // Swal.fire('Your entire team quit :('
        // ).then(() => {
        //     window.location.reload(false);
        // })
      }})
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