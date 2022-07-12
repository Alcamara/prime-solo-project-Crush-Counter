import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gamertag, setGamertag] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     username: username,
    //     password: password,
    //   },
    // });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className='input-section'>
        
          <TextField
            label='Email'
            variant='standard'
            type="text"
            name="username"
            value={username}
            required
            className='input'
            onChange={(event) => setUsername(event.target.value)}
          />
        
      
       
          <TextField
            label='Password'
            variant='standard'
            type="password"
            name="password"
            value={password}
            required
            className='input'
            onChange={(event) => setPassword(event.target.value)}
          />
        
      </div>
      <div className='input-section'>
        
          <TextField
            label='First Name'
            variant='standard'
            type="text"
            value={firstName}
            required
            className='input'
            onChange={(event) => setFirstName(event.target.value)}
          />
        
      
       
          <TextField
            label='Last Name'
            variant='standard'
            type="text"
            value={lastName}
            required
            className='input'
            onChange={(event) => setLastName(event.target.value)}
          />
        
      </div>
      <div className='input-section-2'>
          <TextField
          fullWidth
            label='Gamertag'
            variant='standard'
            type='text'
            required
            className='input-2'
          />
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
