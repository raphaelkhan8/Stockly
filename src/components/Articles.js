import Article from './Article'

const Articles = ({ articles, saveArticle, deleteArticle }) => {
  return (
    <>
      {articles.map((article, i) => (
        <Article key={i} article={article} saveArticle={saveArticle} deleteArticle={deleteArticle} origin={"Articles"} />
      ))}
    </>
  )
}

export default Articles