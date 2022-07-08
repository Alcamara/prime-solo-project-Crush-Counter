import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

//MUI
import TextField from '@mui/material/TextField';



export default function CCMatchNote() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [matchNote,setMatchNote] = useState({});
    const tournamentTitle = useSelector(store => store.tournament);
    
    useEffect(()=>{
        console.log(id);
        dispatch({
            type:"FETCH_TOURNAMENT_DETAILS",
            payload: id
        })
    },[id])


    return (
        <div>
            <h2>{tournamentTitle.name} Notes</h2>
            
            <div>
            <TextField
                id="filled-multiline-static"
                label="Additional Notes"
                multiline
                rows={4}
                placeholder="Added additional notes"
                variant="filled"
            />
            </div>
        </div>
    )
}