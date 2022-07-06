import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export default function () {

    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(()=>{
        
        console.log(id);
        dispatch({
            type:"FETCH_TOURNAMENT_DETAILS",
            payload: id
        })
    },[id])

    return(
        <div>
            <h2>Tournament Details</h2>
            <p>lkajdflkjasdl;fkjal;fkjda</p>
        </div>
    )
}