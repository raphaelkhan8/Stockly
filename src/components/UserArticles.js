import { FaTimes } from 'react-icons/fa'

const UserArticles = ({ userArticles, deleteArticle }) => {
  return (
    <>
    <h2>Saved Articles</h2>
      {userArticles.map((article, index) => (
        <div className='stock'>
        <h3>
          Ticker: {article.symbol.toUpperCase()}{' '}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            title="Delete"
            onClick={() => deleteArticle(article)}
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

export default UserArticles