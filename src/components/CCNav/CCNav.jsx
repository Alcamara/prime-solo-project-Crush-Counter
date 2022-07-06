import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from 'react-router-dom';

//css
import './CCNav.css'

const useStyles = makeStyles({
    root: {
      width: 375,
    },
  });

export default function CCNav(){

    const classes = useStyles();
    

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
            <Link to={"/main"}>
              <BottomNavigationAction label="Main" icon={<HomeIcon />} />
            </Link>
            <BottomNavigationAction label="Player Hub" icon={<AssessmentIcon />} />
            </BottomNavigation>

       </div>
    )
}