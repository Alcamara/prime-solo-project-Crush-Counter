import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom';

//CSS
import './CCSearchItem.css'

export default function CCSearchItem({tournament}){

    const date = new Date(tournament.startAt *1000)
    const history = new useHistory()
    const isOnline = tournament.isOnline ? "online" : "offline";
    return(
        <div
            className='card'
        >
            { tournament && tournament.images && tournament.images.length >= 1 &&
            <Card
            onClick={()=>{
                history.push('/tournamentDetail/'+tournament.id)
            }}
            variant="outlined"
            row
            sx={{
                
                mb: 2,
                maxWidth: '340px',
                gap: 2,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
            >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                src={tournament.images[0].url}
                alt=""
                />
            </AspectRatio>
            <Box>
                <Box sx={{ ml: 1 }}>
                <Typography level="h4" fontSize="" id="card-description" mb={0.5}>
                    {tournament.name}
                </Typography>
                <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                    {tournament.addrState}
                </Typography>
                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                >
                 {isOnline}   
                </Chip>
                </Box>
            </Box>
            </Card> }
        </div>
    )
}