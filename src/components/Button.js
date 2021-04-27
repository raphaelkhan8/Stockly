import PropTypes from 'prop-types'

const Button = ({ color, text, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button