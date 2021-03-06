import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
//Cruch Counter Components
import CCMainPage from '../CCMainPage/CCMainPage';
import CCTournamentDetailCard from '../CCTournamentDetailCard/CCTournamentDetailCard';
import CCNav from '../CCNav/CCNav';
import CCHeader from '../CCHeader/CCHeader';
import CCTournamentSearch from '../CCTournamentSearch/CCTournamentSearch';
import CCMatchNote from '../CCMatchNote/CCMatchNote';
import CCSavedMatchNote from '../CCSavedMatchNote/CCSavedMatchNote';
import CCMatchNoteList from '../CCMatchNoteList/CCMatchNoteList';
import CCTournamentSearchDD from '../CCTournamentSearchDD/CCTournamentSearchDD';
import CCPlayerHub from '../CCPlayerHub/CCPlayerHub';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className='main'>
        
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <CCHeader/>
            <AboutPage />
            <CCNav/>
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <CCHeader/>
            <CCMainPage/>
            <CCNav/>
          </ProtectedRoute>

          <ProtectedRoute
            // Player hub
            exact
            path="/hub"
          >
            <CCHeader/>
            <CCPlayerHub/>
            <CCNav/>
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          
          {/* user main page
            switch router to protected later
          */}
          <ProtectedRoute exact path="/main">
            {/* <CCMainPage/>
            <CCNav/> */}
            
          </ProtectedRoute>

          {/* CCtournamentSearch */}
          <Route exact path="/tournamentSearch">
            <CCHeader/>
            <CCTournamentSearchDD/>
            <CCTournamentSearch/>
            <CCNav/> 
          </Route>

          {/* CCTournamentsDetails Page */}
          <ProtectedRoute exact path="/tournamentDetail/:id">
            <CCHeader/>
            <CCTournamentDetailCard/>
            <CCNav/> 
          </ProtectedRoute>

          <ProtectedRoute path="/match-notes" exact>
            <CCHeader/>
            <CCMatchNoteList/>
            <CCNav/>
          </ProtectedRoute>

          <ProtectedRoute path="/match-note/:id" exact>
            <CCHeader/>
            <CCMatchNote/>
            <CCNav/>
          </ProtectedRoute>

          <ProtectedRoute path="/match-note/saved/:id" exact>
            <CCHeader/>
            <CCSavedMatchNote/>
            <CCNav/>
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
    
      </div>
    </Router>
  );
}

export default App;
