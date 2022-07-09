import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import ListDivider from '@mui/joy/ListDivider';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';


export default function CCMatchNoteListItem({note,matchNotes}){
   console.log();
    return (
      
      <ListItem
        endAction={
          <IconButton aria-label="Delete" size="sm" color="danger">
            <Delete />
          </IconButton>
        }
      >
      <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
       { matchNotes && matchNotes.images && matchNotes.images.length >= 1 && <Avatar src={matchNotes.images[1].url} /> }
      </ListItemDecorator>
      <ListItemContent>
        <Typography noWrap>{matchNotes.name}</Typography>
        <Typography level="body2" noWrap>
          {note.note}
        </Typography>
      </ListItemContent>
    </ListItem>
    
    )
}

              