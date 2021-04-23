import { useState } from 'react'

const SearchStock = ({ searchStock }) => {
  const [ticker, setText] = useState('')

  const onSubmit = (e) => {
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
          placeholder='Stock or Cryto ticker symbol'
          value={ticker}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <input type='submit' value='Search Stock' className='btn btn-block' />
    </form>
  )
}

export default SearchStock