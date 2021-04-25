import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onSignUp, showSignUp, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (showSignUp !== undefined) ? 
        <Button
          color={showSignUp ? 'red' : 'green'}
          text={showSignUp ? 'Cancel' : 'New User? Signup Here'}
          onClick={onSignUp}
        /> :
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Cancel' : 'Search'}
          onClick={onAdd}
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