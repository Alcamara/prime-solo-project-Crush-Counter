import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import CCSearchItem from "../CCSearchItem/CCSearchItem";

//cc
import './CCTournamentSearch.css'

export default function CCTournamentSearch(){
    const dispatch = useDispatch();
    const tournamentSearchResults = useSelector(store => store.tournamentSearch);
    const history = useHistory()
    

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