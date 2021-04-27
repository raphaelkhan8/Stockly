import { FaSave } from 'react-icons/fa'

const Articles = ({ articles, saveArticle }) => {
  return (
    <>
    {console.log('ART from Articles component', articles)}
      {articles.map((article) => (
        <div className='stock'>
        <h3>
          Ticker: {article.symbol.toUpperCase()}{' '}
          <FaSave
            style={{ color: 'green', cursor: 'pointer' }}
            title="Save"
            onClick={() => saveArticle(article)}
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