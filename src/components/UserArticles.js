import Article from './Article'

const UserArticles = ({ userArticles, deleteArticle }) => {
  return (
    <>
    <h2>Saved Articles</h2>
    {userArticles.map((article, i) => (
        <Article key={i} article={article} deleteArticle={deleteArticle} origin={"UserArticles"} />
      ))}
    </>
  )
}

export default UserArticles