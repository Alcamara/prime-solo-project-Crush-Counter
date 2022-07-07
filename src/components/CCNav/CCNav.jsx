import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';

import { useHistory } from 'react-router-dom';

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

    return(
       <div className='bottomNav'>
            <BottomNavigation
            
            onChange={(event, newValue) => {
                console.log('click');
            }}
            showLabels
            className={classes.root}
            >
            
            <BottomNavigationAction label="Tournaments" icon={<SearchIcon />} />
            {/* redirect user to main page */}
            
              <BottomNavigationAction
                onClick={()=> history.push("/main") } 
                label="Main" 
                icon={<HomeIcon />} 
              />
            
            <BottomNavigationAction label="Player Hub" icon={<AssessmentIcon />} />
            </BottomNavigation>

       </div>
    )
}