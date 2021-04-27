import { FaSave, FaTimes } from 'react-icons/fa'

const Article = ({ article, saveArticle, deleteArticle, origin }) => {
  return (
    <>
        <div className='stock'>
        <h3>
          Ticker: {article.symbol.toUpperCase()}{' '}
          {(origin === "Articles") ? 
            <FaSave
                style={{ color: 'green', cursor: 'pointer' }}
                title="Save"
                onClick={() => saveArticle(article)}
            /> : 
            <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                title="Delete"
                onClick={() => deleteArticle(article)}
          />}
        </h3>
        <p><b>Summary:</b> {article.summary}</p>
        <p><b>Sentiment:</b> {article.sentiment}</p>
        <p><b>Score:</b> {article.score}</p>
        <p><b>Article:</b> {<a href={article.url} target="_blank" rel="noreferrer noopener">Click to Open in New Tab</a>}</p>
      </div>
    </>
  )
}

export default Article