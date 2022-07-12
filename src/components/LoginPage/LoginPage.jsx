import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <button
          className='CA-btn'
          onClick={() => {
            history.push('/registration');
          }}
        >
          SIGN UP
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
