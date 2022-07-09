import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";


export default function CCMatchNotes(){

    const dispatch = useDispatch();
    //const tournamentSearchResults = useSelector(store => store.tournamentSearch);
    const history = useHistory()

    useEffect(()=>{
        dispatch({
            type: "FETCH_MATCH_NOTES"
        })
    },[])

    return(
        <div>
            <h2>Match Notes</h2>
        </div>
    )
}