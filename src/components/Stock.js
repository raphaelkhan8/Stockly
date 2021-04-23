import { FaTimes } from 'react-icons/fa'

const Stock = ({ article, stock, onDelete }) => {
  return (
    <div>
      {console.log('BART', article)}
      <h3>
        {article.symbol}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(article.id)}
        />
      </h3>
      <p>{article.summary}</p>
      <p>{article.sentiment}</p>
      <p>{article.score}</p>
      <p>{article.url}</p>
    </div>
    // <div
    //   className={`stock ${stock.reminder ? 'reminder' : ''}`}
    //   onDoubleClick={() => onToggle(stock.id)}
    // >
    //   <h3>
    //     {stock.text}{' '}
    //     <FaTimes
    //       style={{ color: 'red', cursor: 'pointer' }}
    //       onClick={() => onDelete(stock.id)}
    //     />
    //   </h3>
    //   <p>{stock.day}</p>
    // </div>
  )
}

export default Stock