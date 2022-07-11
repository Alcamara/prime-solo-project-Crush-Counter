import './CCHeader.css'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


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
//list
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function CCHeader (){

        const [open,setOpen] = useState(false)
        const history = useHistory()

    return (
        <AppBar position="static" >
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
            anchor='left'
            open={open}
            onOpen={()=>{
                setOpen(true)
            }}
            onClose={()=>{
                setOpen(false)
            }}
        >
            <IconButton>
                <ChevronLeftIcon onClick={()=> setOpen(false)}/>
            </IconButton>
            <Divider/>
            <List>
                <ListItem>
                    <ListItemButton
                        onClick={()=> history.push('/match-notes')}
                    >
                        <ListItemIcon>
                            <NoteIcon/>
                            <ListItemText primary={'Match Notes'} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                                <EventNoteIcon/>
                                <ListItemText primary={`Bookmarked Tournaments`} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText primary={'Log out'} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </SwipeableDrawer>
      </AppBar>
      
    )
}