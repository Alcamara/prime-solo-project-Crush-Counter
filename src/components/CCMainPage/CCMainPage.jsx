import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import CCHeader from "../CCHeader/CCHeader"
import CCNav from "../CCNav/CCNav"

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
                <div>

                    { tournaments && <ul>{tournaments.sort((a,b) =>( b.numAttendees - a.numAttendees )).map(tournament =>(
                        <li key={tournament.id}>{tournament.numAttendees}</li>
                    ))}</ul>}

                </div>
                
            </main>
        </div>
        
        
    )
}