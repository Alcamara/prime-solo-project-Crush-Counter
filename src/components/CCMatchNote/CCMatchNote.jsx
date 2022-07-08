import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"



export default function CCMatchNote() {
    const dispatch = useDispatch();
    const [matchNote,setMatchNote] = useState({})
    const {id} = useParams()
    useEffect(()=>{
        console.log(id);
        
    },[id])


    return (
        <div>
            <h2>hello</h2>
        </div>
    )
}