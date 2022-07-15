import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import CCSearchItem from "../CCSearchItem/CCSearchItem";

//cc
import './CCTournamentSearch.css'

export default function CCTournamentSearch(){
    const dispatch = useDispatch();
    console.log(Date.now());
    const tournamentSearchResults = useSelector(store => store.tournamentSearch
        .sort((a,b)=>( a.startAt - b.startAt))
        .filter(tournamentObj => tournamentObj.startAt > Math.round(Date.now()/ 1000 )));
    const history = useHistory()
    
    console.log(tournamentSearchResults, 'timestamp :', Date.now());

    return (
        <div>
            <h2>Results:</h2>
            <div className="results">
            {tournamentSearchResults &&
                tournamentSearchResults.map(tournament =>(
                    <CCSearchItem 
                        key={tournament.id} 
                        tournament={tournament}
                    />
                ))
            }
            </div>
        </div>
    )
}