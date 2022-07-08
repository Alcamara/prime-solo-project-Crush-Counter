import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
//css

//MUI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

export default function () {

    const dispatch = useDispatch()
    const {id} = useParams()
    const tournamentDetail = useSelector(store => store.tournament)
    const history = useHistory()
    

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(()=>{
        
        console.log(id);
        dispatch({
            type:"FETCH_TOURNAMENT_DETAILS",
            payload: id
        })
    },[id])

    return(
        <div className="tournament-card">
           { tournamentDetail && tournamentDetail.images && tournamentDetail.images.length >= 1 &&
            <Card sx={{ maxWidth: 445 }}>
            <CardHeader
              avatar={
                <Avatar  aria-label="recipe">
                  <img src={tournamentDetail.images[0].url} alt=""  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <BookmarkAddIcon
                    onClick={()=>{
                      dispatch({
                        type: "BOOKMARK_TOURNAMENT",
                        payload: tournamentDetail.id
                      })
                    }}
                  />
                </IconButton>
              }
              title={tournamentDetail.name}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image={tournamentDetail.images[1].url}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {tournamentDetail.venueAddress}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Tournaments Rule:</Typography>
                <Typography paragraph>
                  {tournamentDetail.rules}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>}
          <div className="buttons">
          <Stack  direction="row" spacing={2}>
            <Button
              onClick={()=>{
                //goes Back to prev page
                history.goBack()
              }} 
              color="error" 
              variant="contained"
            >
              Back
            </Button>
            <Button 
              onClick={()=>{
                
                window.location.replace('https://start.gg'+ tournamentDetail.url)
               
              }}
              color="success" 
              variant="contained"
            >
              Sign up for Tournament
            </Button>
            <Button
              variant="contained"
            >
              Create Match Note
            </Button>
          </Stack>
          </div>
            
        </div>
    )
}