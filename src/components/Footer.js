import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <p>Enter a stock or crypto ticker to find the latest news. Ten of the most recent news articles on the ticker will be compiled, summarized, and analyzed for sentiment. Use this information to become a smarter trader!</p>
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to='/about'>About</Link>
    </footer>
    </div>
  )
}

export default Footer