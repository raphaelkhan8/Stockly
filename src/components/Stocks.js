import Stock from './Stocks'

const Stocks = ({ stocks, articles, onDelete }) => {
  return (
    <>
      {articles.map((article, index) => (
        <Stock key={index} article={article} onDelete={onDelete} />
      ))}
    </>
  )
}

export default Stocks