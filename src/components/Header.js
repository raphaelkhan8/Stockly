import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, showLogin, onPress, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (showLogin !== undefined) ? 
        <Button
          color={showLogin ? 'green' : 'red'}
          text={showLogin ? 'New User? Signup Here' : 'Cancel'}
          onClick={onPress}
        /> :
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Cancel' : 'Search'}
          onClick={onPress}
        />
      }
    </header>
  )
}

Header.defaultProps = {
  title: 'Stockly',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header