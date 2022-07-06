//joy-ui
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

export default function CCTournamentCards({tournament}){
    console.log(tournament.images[0].url);
    return (
        <div >
            <Card variant="outlined" sx={{ maxWidth: 220 }}>
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
                    California
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
                    6.3k views
                    </Typography>
                    <Box sx={{ width: 2, bgcolor: 'divider' }} />
                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    1 hour ago
                    </Typography>
                </CardOverflow>
            </Card>
        </div>
    )
}