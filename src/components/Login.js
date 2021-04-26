import { useState } from 'react'

const Login = ({ getUser, saveUser, showLogin }) => {
  
    const [userName, setName] = useState('');
    const [passWord, setPass] = useState('');

    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!userName || !passWord) {
        alert('Please enter both a username and password.')
        return;
      }

      (showLogin) ? getUser({ userName, passWord }) : saveUser( { userName, passWord })
  
      setName('');
      setPass('');
    }

    const displayView = (showLogin) => {
        return (showLogin) ? 'Login' : 'Sign Me Up';
    }

    return (
      <>
        <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
        <label>{displayView(showLogin)}</label>
        <input
          type='text'
          placeholder='Username'
          value={userName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Password'
          value={passWord}
          onChange={(e) => setPass(e.target.value)}
        />
        </div>

      <button type='submit' 
        className='btn btn-block' >{displayView(showLogin)}
      </button>
    </form>
      </>
    )
  }

  export default Login