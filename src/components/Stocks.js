import Stock from './Stocks'

const Stocks = ({ stocks, onDelete, onToggle }) => {
  return (
    <>
      {stocks.map((stock, index) => (
        <Stock key={index} stock={stock} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Stocks