//joy-ui
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
//css
import './CCTournamentCards.css'


export default function CCTournamentCards({tournament}){
    const startTimeStamp = tournament.startAt
    const endTimeStamp = tournament.endAt
    let startDate = new Date(startTimeStamp * 1000)
    let endDate = new Date(endTimeStamp * 1000);
    

    return (
        <div className='cards' >
            <Card variant="outlined" sx={{ maxWidth: 210 }}>
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            src={tournament.images[0].url}
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                    {tournament.name}
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                    {tournament.addrState}
                </Typography>
                <CardOverflow
                    variant="soft"
                    sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.5,
                    px: 'var(--Card-padding)',
                    borderTop: '1px solid',
                    borderColor: 'neutral.outlinedBorder',
                    bgcolor: 'background.level1',
                    }}
                >
                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    {tournament.numAttendees} participants
                    </Typography>
                    <Box sx={{ width: 2, bgcolor: 'divider' }} />
                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    {`${startDate.getMonth()+1}/${startDate.getDate()} - ${endDate.getDate()}`}
                    </Typography>
                </CardOverflow>
            </Card>
        </div>
    )
}