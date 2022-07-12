import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css'

//MUI
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  

  return (
    <div className="container">
        <header>
          <h1>Welcome to </h1>
            <h2>Crush Counter</h2>
        </header>
        <div className='summary'>
        Crush Counter is an app that helps a competitive fighting game player 
        improve their game by finding tournaments to compete 
        and identify skills to develop.
        </div>
        <div className='landing-page-btns'>
          <Button
            variant='contained'
            endIcon={<SearchIcon/>}
          >
              Search For Tournament
              
          </Button>
        </div>
    </div>
  );
}

export default LandingPage;
