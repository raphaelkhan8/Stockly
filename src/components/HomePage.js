import { useState, useEffect } from 'react'
import Header from './Header'
import Stocks from './Stocks'
import SearchStock from './SearchStock'
import socketIoClient from 'socket.io-client'
let socket;

const HomePage = () => {

    const [showAddStock, setShowAddStock] = useState(false)
    const [stocks, setStocks] = useState([])
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      (()=> {
        let articles = [];
        socket = socketIoClient("http://127.0.0.1:3001");
        socket.on("data-ready", (data) => {
          setLoading(false)
          const parsedArrayData = JSON.parse(data);
          parsedArrayData.forEach(article => {
            let obj = {};
            obj.id = Math.floor(Math.random() * 10000) + 1
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
  
    // Fetch All Stocks
    const fetchStocks = async () => {
      const res = await fetch('http://localhost:3001/stocks')
      const data = await res.json()
      return data;
    }
  
    // Fetch Stock by id
    const fetchStock = async (id) => {
      const res = await fetch(`http://localhost:3001/stocks/${id}`)
      const data = await res.json()
  
      return data
    }
  
    // Send ticker to back-end
    const searchStock = async ({ ticker }) => {
      console.log(ticker);
      setLoading(true);
      socket.emit("data-fetch", ticker);
    }
  
    // Add Stock
    const addStock = async (stock) => {
      const res = await fetch('http://localhost:3001/stocks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(stock),
      })
  
      const data = await res.json()
  
      setStocks([...stocks, data])
  
    }
  
    // Delete Stock
    const deleteStock = async (id) => {
      const res = await fetch(`http://localhost:3001/stocks/${id}`, {
        method: 'DELETE',
      })
      // Controls the response status to decide if state will be changed or not.
      res.status === 200
        ? setStocks(stocks.filter((stock) => stock.id !== id))
        : alert('Error Deleting This Stock Article')
    }
    return (
      <>
       <Header
            onAdd={() => setShowAddStock(!showAddStock)}
            showAdd={showAddStock}
          />
        {showAddStock && <SearchStock searchStock={searchStock} loading={loading} setLoading={setLoading} />}
        {
       (articles.length > 0) ? (
          <Stocks
           stocks={stocks}
            articles={articles}
           onDelete={deleteStock}
          />
       ) : (
          'Click Search to find the latest news on the input stock. Ten of the most recent news articles will be compiled, summarized, and analyzed for sentiment. Use this information to become a smarter trader!'
        )
        }
      </>
    )
  }

  export default HomePage