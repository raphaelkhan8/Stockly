import { FaTimes } from 'react-icons/fa'

const Stock = ({ article, stock, onDelete }) => {
  return (
    <div>
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
  )
}

export default Stock