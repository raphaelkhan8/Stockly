import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import TextLoop from "react-text-loop";

const SearchStock = ({ searchStock, loading, userId }) => {
  console.log('USER', userId);
  const [ticker, setText] = useState('')

  const onSubmit = (e) => {
    console.log('Clicked');
    e.preventDefault()

    if (!ticker) {
      alert('Please enter a ticker symbol')
      return
    }

    searchStock({ ticker })

    setText('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Ticker</label>
        <input
          type='text'
          placeholder={loading ? 'Fetching data...this will take a few minutes' : 'Stock or Cryto ticker symbol'}
          value={ticker}
          onChange={(e) => setText(e.target.value)}
          disabled={loading ? true : false}
        />
      </div>

      <button type='submit' disabled={loading ? true : false} className='btn btn-block' > 
      {loading ?
          (<Spinner animation="border" variant="light" role="status"><span className="sr-only">
            <TextLoop interval={20000}>
              <div>Searching for stock news...</div>
              <div>Scraping news links...</div>
              <div>Summarizing articles...</div>
              <div>Calculating sentiment...</div>
              <div>Gathering results...</div>
            </TextLoop>
            </span>
          </Spinner>)
        :'Search Stock'}
      </button>
    </form>
  )
}

export default SearchStock