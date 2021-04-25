import { useState, useEffect } from 'react'
import Header from './Header'
import socketIoClient from 'socket.io-client'
let socket;

const Login = ({ setUserId, saveUser }) => {
  
    const [userName, setName] = useState('');
    const [passWord, setPass] = useState('');

    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!userName || !passWord) {
        alert('Please enter both a username and password.')
        return;
      }
  
      saveUser({ userName, passWord })
  
      setName('');
      setPass('');
    }

    return (
      <>
        <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
        <label>Login</label>
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
        className='btn btn-block' >Login
      </button>
    </form>
      </>
    )
  }

  export default Login