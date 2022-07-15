import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@mui/material/Paper';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//css
import './CCNav.css'

const useStyles = makeStyles({
    root: {
      width: 375,
    },
  });

export default function CCNav(){

    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()

    return(
       <div className='bottomNav'>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
            
            onChange={(event, newValue) => {
                console.log('click');
            }}
            showLabels
            className={classes.root}
            >
            
            <BottomNavigationAction
              onClick={()=> history.push("/tournamentSearch") }  
              label="Tournaments" 
              icon={<SearchIcon />} 
              />
            
            {/* redirect user to main page */}
              <BottomNavigationAction
                onClick={()=> {

                  history.push("/user")
                  dispatch({ type: "CLEAR_TOURNAMENT_DETAILS"})
                }} 
                label="Main" 
                icon={<HomeIcon />} 
              />
            
            <BottomNavigationAction 
              onClick={()=> history.push('/hub')}
              label="Player Hub" 
              icon={<AssessmentIcon />} 
            />
            </BottomNavigation>
          </Paper>
       </div>
    )
}