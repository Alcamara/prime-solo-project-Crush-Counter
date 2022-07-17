import './CCHeader.css'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import NoteIcon from '@mui/icons-material/Note';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
//list
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;


  

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export default function CCHeader (){

        const [open,setOpen] = useState(false)
        const history = useHistory()
        const dispatch = useDispatch()

    return (
        <AppBar  position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon 
                onClick={()=> setOpen(true)}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crush Counter
          </Typography>
        </Toolbar>
        <SwipeableDrawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            variant="persistent"
            anchor='left'
            open={open}
            onOpen={()=>{
                setOpen(true)
            }}
            onClose={()=>{
                setOpen(false)
            }}
        >
            <DrawerHeader>
                <ChevronLeftIcon onClick={()=> setOpen(false)}/>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItem>
                    <ListItemButton
                        onClick={()=> history.push('/match-notes')}
                    >
                        <ListItemIcon>
                            <NoteIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Match Notes'} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        onClick={()=> history.push('/about')}
                    >
                        <ListItemIcon>
                                <InfoIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`About Page`} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                    >
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Log out'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </SwipeableDrawer>
      </AppBar>
      
    )
}