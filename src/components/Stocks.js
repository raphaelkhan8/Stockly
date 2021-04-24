import { FaTimes } from 'react-icons/fa'

const Stocks = ({ stocks, articles, onDelete }) => {
  return (
    <>
      {articles.map((article, index) => (
        <div className='stock'>
        <h3>
          Ticker: {article.symbol.toUpperCase()}{' '}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(article.id)}
          />
        </h3>
        <p><b>Summary:</b> {article.summary}</p>
        <p><b>Sentiment:</b> {article.sentiment}</p>
        <p><b>Score:</b> {article.score}</p>
        <p><b>Article:</b> {<a href={article.url} target="_blank" rel="noreferrer noopener">Click to Open in New Tab</a>}</p>
      </div>
      ))}
    </>
  )
}

export default Stocks