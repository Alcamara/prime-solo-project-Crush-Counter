import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import CCTournamentCards from "../CCTournamentCards/CCTournamentCards"
import CCHeader from "../CCHeader/CCHeader"
import './CCMainPage.css'

//joy-ui
import Box from '@mui/joy/Box';

//carousel
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function () {
    const dispatch = useDispatch()
    const tournaments = useSelector(store => store.tournaments)
    const tournamentsByAttendees = [...tournaments]
    tournamentsByAttendees.sort((a,b) =>( b.numAttendees - a.numAttendees ))
   const tournamentsNearBy = [...tournaments]
   tournamentsNearBy.sort((a, b) => a.startAt - b.startAt)

   if(tournaments){
    console.log(tournaments);
    console.log(tournaments[0]);
    
   }
    
    useEffect(()=>{
        dispatch({
            type: 'FETCH_TOURNAMENTS_DATA'
        })
    },[])

    return (
        <div>
            <CCHeader/>
                <h2 className="feature-tournaments_header" >Feature Tournaments</h2>
                <Swiper
                    className="featureTournaments"
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    { tournamentsByAttendees && <div>{tournamentsByAttendees.map(tournament =>(
                       <SwiperSlide key={tournament.id} > <CCTournamentCards className="card" key={tournament.id} tournament={tournament} /></SwiperSlide>
                    ))}</div>}
                </Swiper>
                <h2 className="feature-tournaments_header" >Upcoming Tournaments</h2>
                
                <Swiper
                    className="featureTournaments"
                    spaceBetween={0}
                    slidesPerView={1}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                        {tournamentsNearBy && tournamentsNearBy.map(tournament => (
                            
                            <Link
                                to={`/tournamentDetails/${tournament.id}`}
                            >
                                <SwiperSlide onClick={()=> console.log('hey')} key={tournament.id} > 
                                    <CCTournamentCards className="card" key={tournament.id} tournament={tournament} />
                                </SwiperSlide>
                            </Link>
                        ))}
                </Swiper>
        </div>
        
        
    )
}