import { useState } from 'react'
import Swal from "sweetalert2";

const Login = ({ getUser, saveUser, showLogin }) => {
  
    const [userName, setName] = useState('');
    const [passWord, setPass] = useState('');

    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!userName || !passWord) {
        Swal.fire('Please enter both a username and password.')
        return;
      }

      (showLogin) ? getUser({ userName, passWord }) : saveUser( { userName, passWord })
  
      setName('');
      setPass('');
    }

    const togglePass = () => {
        let x = document.getElementById("inputPass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
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
          id="inputPass"
          type='password'
          placeholder='Password'
          value={passWord}
          onChange={(e) => setPass(e.target.value)}
        />
        </div>
        <input type="checkbox" onClick={togglePass} />Show Password

      <button type='submit' 
        className='btn btn-block' >{displayView(showLogin)}
      </button>
    </form>
      </>
    )
  }

  export default Login