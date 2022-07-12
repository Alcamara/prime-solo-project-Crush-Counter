import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css'

//MUI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import PieChartIcon from '@mui/icons-material/PieChart';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
    const history = useHistory()

  return (
    <div className="container">
      <div className='info'>

      
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
          <Stack spacing={5}>
          <Button
            onClick={()=> history.push('/tournamentSearch')}
            variant='contained'
            endIcon={<SearchIcon/>}
          >
              SEARCH FOR TOURNAMENT 
          </Button>
          <Button
            onClick={()=> history.push('/login')}
            variant='contained'
            endIcon={<PieChartIcon/>}
          >
            LOGIN
          </Button>
          </Stack>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;
