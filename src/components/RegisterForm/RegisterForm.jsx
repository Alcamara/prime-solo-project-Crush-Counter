import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//MUI
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function RegisterForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [state, setState] = useState('');

  const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gamertag: gamertag,
        state: state

      },
    });
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
            value={gamertag}
            required
            className='input-2'
            onChange={(event) => setGamertag(event.target.value)}
          />
      </div>
      <div className='input-section-3'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            label='State'
            value={state}
            onChange={(event)=> setState(event.target.value)}
          >
            {states.map(state =>(
              <MenuItem value={state}>{state}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
