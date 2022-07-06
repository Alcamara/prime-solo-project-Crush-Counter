import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import CCTournamentCards from "../CCTournamentCards/CCTournamentCards"
import CCHeader from "../CCHeader/CCHeader"
import './CCMainPage.css'

export default function () {
    const dispatch = useDispatch()
    const tournaments = useSelector(store => store.tournaments)

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
            <main>
                <div className="featureTournament">

                    { tournaments && <div>{tournaments.sort((a,b) =>( b.numAttendees - a.numAttendees )).map(tournament =>(
                        <CCTournamentCards key={tournament.id} tournament={tournament} />
                    ))}</div>}

                </div>
                
            </main>
        </div>
        
        
    )
}