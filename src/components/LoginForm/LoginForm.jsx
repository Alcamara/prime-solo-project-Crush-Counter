import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
//MUI
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div>
      <header>
        <h1>Crush Counter</h1>
      </header>
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className='TextField'>
        
          
          <TextField
            label='Email'
            variant='filled'
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin='normal'
          />
        
      
        
          
          <TextField
            variant='filled'
            label={'Password'}
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin='normal'
          />
        
      </div>
      <div className='login-btn-section'>
        
        <Button
          className='login-btn'
          variant='contained'
          onClick={login}
        >
          LOG IN
        </Button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
