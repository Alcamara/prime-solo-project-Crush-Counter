import { useState } from 'react';
import { useDispatch } from 'react-redux';


import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import ListDivider from '@mui/joy/ListDivider';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import { Button } from '@material-ui/core';
///
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CCMatchNoteListItem({note,matchNotes}){
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


   
    return (
      
      <ListItem
        endAction={

          <IconButton
            onClick={()=>{
              console.log('delete');
              handleClickOpen()
            }} 
            aria-label="Delete" 
            size="sm" 
            color="danger">
            <Delete />
          </IconButton>
          
          
        }
      >
        {/* dialog alert */}
      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action will permanently delete this note. Are you
                ok with this?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button 
                onClick={()=>{
                  dispatch({
                    type:"DELETE_MATCH-NOTE",
                    payload: note.id
                  })
                  handleClose()
                }} 
                autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
      <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
       { matchNotes && matchNotes.images && matchNotes.images.length >= 1 && <Avatar src={matchNotes.images[1].url} /> }
      </ListItemDecorator>
      <ListItemContent>
        <Typography noWrap>{matchNotes.name}</Typography>
        <Typography noWrap>05/22/1985</Typography>
        <Typography level="body2" noWrap>
          {note.note}
        </Typography>
      </ListItemContent>
    </ListItem>
    
    )
}

              