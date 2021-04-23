import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Stocks from './components/Stocks'
import SearchStock from './components/SearchStock'
import About from './components/About'
const amqp = require('amqplib/callback_api');

const App = () => {
  const [showAddStock, setShowAddStock] = useState(false)
  const [stocks, setStocks] = useState([])
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const getStocks = async () => {
      const stocksFromServer = await fetchStocks()
      setStocks(stocksFromServer)
    }
    getStocks()
  }, [])

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
    const res = await fetch(`http://localhost:3001/stock/${ticker}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    const data = await res.json();
    console.log(data);
    res.send(data);
    // let data = {}
    // data.id = 1;
    // data.symbol = 'BTC';
    // data.summary = 'Thodex was trading more than $585 million before shutting down. CEO Mehmet has gone missing, reports CoinDesk';
    // data.sentiment = 'NEGATIVE';
    // data.score = 0.9995017647;
    // data.url = 'https://finance.yahoo.com/news/turkish-state-news-reports-crypto-124511311.html';

    // setArticles([...articles, data]);
    // console.log('ART: ', articles);
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

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newStock = { id, ...stock }
    // setStocks([...stocks, newStock])
  }

  // Delete Stock
  const deleteStock = async (id) => {
    const res = await fetch(`http://localhost:3001/stocks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setStocks(stocks.filter((stock) => stock.id !== id))
      : alert('Error Deleting This Stock Article')
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddStock(!showAddStock)}
          showAdd={showAddStock}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddStock && <SearchStock searchStock={searchStock} />}
              {(stocks.length > 0 || articles.length > 0) ? (
                <Stocks
                  stocks={stocks}
                  articles={articles}
                  onDelete={deleteStock}
                />
              ) : (
                'Click Search to find the latest news on the input stock. Ten of the most recent news articles will be compiled, summarized, and analyzed for sentiment. Use this information to become a smarter trader!'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
