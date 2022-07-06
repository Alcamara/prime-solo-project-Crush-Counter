import { useEffect } from "react"
import { useDispatch } from "react-redux"
import CCHeader from "../CCHeader/CCHeader"
import CCNav from "../CCNav/CCNav"

export default function () {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type: 'FETCH_TOURNAMENTS_DATA'
        })
    },[])

    return (
        <div>
            <CCHeader/>
            <main>
                
            </main>
        </div>
        
        
    )
}