import Stock from './Stocks'

const Stocks = ({ stocks, articles, onDelete }) => {
  return (
    <>
      {console.log(articles)}
      {articles.map((article, index) => (
        <Stock key={index} article={article} onDelete={onDelete} />
      ))}
      {/* {console.log(stocks)};
      {stocks.map((stock, index) => (
        <Stock key={index} stock={stock} onDelete={onDelete} />
      ))} */}
    </>
  )
}

export default Stocks