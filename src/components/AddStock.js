import { useState } from 'react'

const AddStock = ({ onAdd }) => {
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please enter a ticker symbol')
      return
    }

    onAdd({ text })

    setText('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Ticker</label>
        <input
          type='text'
          placeholder='Stock or Cryto ticker symbol'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <input type='submit' value='Search Stock' className='btn btn-block' />
    </form>
  )
}

export default AddStock