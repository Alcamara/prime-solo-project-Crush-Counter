import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

//cc
import './CCTournamentSearch.css'

export default function CCTournamentSearch(){
    const dispatch = useDispatch();
    const tournsmentsResults = useSelector(store => store);

    useEffect(()=>{
        dispatch({
            type: "FETCH_TOURNAMENTS_LIST"
        })
    },[])

    return (
        <div>
            <h2>Tournament Search</h2>
        </div>
    )
}