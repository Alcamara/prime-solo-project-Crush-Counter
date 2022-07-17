import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Link, useHistory } from 'react-router-dom';
import CCTournamentCards from "../CCTournamentCards/CCTournamentCards"
import CCHeader from "../CCHeader/CCHeader"

import './CCMainPage.css'

//joy-ui
import Box from '@mui/joy/Box';

//carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Grid } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'

//SnackBar MUI
import Snackbar from '@mui/material/Snackbar';



export default function () {
    const dispatch = useDispatch()
    const tournaments = useSelector(store => store.tournaments)
    const bookmarkTournaments = useSelector(store => store.bookmarkTournament.sort((a,b)=>(a.startAt - b.startAt)))
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });


    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const tournamentsByAttendees = [...tournaments]
    tournamentsByAttendees.sort((a,b) =>( b.numAttendees - a.numAttendees ))
   const tournamentsNearBy = [...tournaments]
   tournamentsNearBy.sort((a, b) => a.startAt - b.startAt)

   const history = useHistory()

    if (bookmarkTournaments) {
        console.log('bookmark in main',bookmarkTournaments);
    }
   
//    let lat;
//    let long;

//    navigator.geolocation.getCurrentPosition(function(position){
//      lat = position.coords.latitude;
//      long = position.coords.longitude;
//      console.log('lat:', lat, 'long:', long );
//    })

   
    
    useEffect(()=>{
        
        dispatch({
            type: 'FETCH_TOURNAMENTS_DATA',
            
        })
        dispatch({
            type: "FETCH_BOOKMARK_TOURNAMENTS",
            
        })
    },[])

    return (
        <div className="Main">
            

            <h2 className="feature-tournaments_header">Bookmark Tournaments</h2>
            
                <Swiper
                        modules={[Navigation,Pagination,FreeMode,Grid]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        scrollbar={{ draggable: true }}
                        
                    >
                        { bookmarkTournaments && <div>{bookmarkTournaments.map(tournament =>(
                            
                        <SwiperSlide
                                
                                onClick={()=> history.push('/tournamentDetail/'+tournament.id) }
                                key={tournament.id} 
                            > 
                            <CCTournamentCards 
                                className="card" 
                                key={tournament.id} 
                                tournament={tournament} />
                            </SwiperSlide>
                        ))}</div>}
                </Swiper>
               
                <h2 className="feature-tournaments_header" >Trending Tournaments</h2>
                <Swiper
                    modules={[Navigation,Pagination,FreeMode,Grid]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    { tournamentsByAttendees && <div>{tournamentsByAttendees.map(tournament =>(
                       <SwiperSlide
                            
                            onClick={()=> history.push('/tournamentDetail/'+tournament.id) }
                            key={tournament.id} 
                        > 
                        <CCTournamentCards 
                            className="card" 
                            key={tournament.id} 
                            tournament={tournament} />
                        </SwiperSlide>
                    ))}</div>}
                </Swiper>
                <h2 className="feature-tournaments_header" >Upcoming Tournaments</h2>
                
                <Swiper
                modules={[Navigation,Pagination,FreeMode,Grid]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                        {tournamentsNearBy && tournamentsNearBy.map(tournament => (
                            
                                <SwiperSlide
                                    
                                    onClick={()=> history.push('/tournamentDetail/'+tournament.id)} 
                                    key={tournament.id} 
                                > 
                                    <CCTournamentCards 
                                        className="card" 
                                        key={tournament.id} 
                                        tournament={tournament} 
                                    />
                                </SwiperSlide>
                    
                        ))}
                </Swiper>
        </div>
        
        
    )
}