import { FaSave } from 'react-icons/fa'

const Articles = ({ articles, addArticle }) => {
  return (
    <>
      {articles.map((article, index) => (
        <div className='stock'>
        <h3>
          Ticker: {article.symbol.toUpperCase()}{' '}
          <FaSave
            style={{ color: 'green', cursor: 'pointer' }}
            title="Save"
            onClick={() => addArticle(article)}
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

export default Articles