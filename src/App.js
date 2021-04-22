import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Stocks from './components/Stocks'
import AddStock from './components/AddStock'
import About from './components/About'

const App = () => {
  const [showAddStock, setShowAddStock] = useState(false)
  const [stocks, setStocks] = useState([])

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

    return data
  }

  // Fetch Stock
  const fetchStock = async (id) => {
    const res = await fetch(`http://localhost:3001/stocks/${id}`)
    const data = await res.json()

    return data
  }

  // Send ticker to back-end
  const getArticles = async ({ text }) => {
    console.log(text);
    const res = await fetch(`http://localhost:3001/stock/${text}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    const data = await res.json();
    console.log(data);
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

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const stockToToggle = await fetchStock(id)
    const updStock = { ...stockToToggle, reminder: !stockToToggle.reminder }

    const res = await fetch(`http://localhost:3001/stocks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updStock),
    })

    const data = await res.json()

    setStocks(
      stocks.map((stock) =>
        stock.id === id ? { ...stock, reminder: data.reminder } : stock
      )
    )
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
              {showAddStock && <AddStock onAdd={getArticles} />}
              {stocks.length > 0 ? (
                <Stocks
                  stocks={stocks}
                  onDelete={deleteStock}
                  onToggle={toggleReminder}
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
