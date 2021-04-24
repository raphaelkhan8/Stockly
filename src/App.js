import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {

  return (
    <Router>
      <div className='container'>
        <Route
          path='/'
          exact
          component={HomePage}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App


