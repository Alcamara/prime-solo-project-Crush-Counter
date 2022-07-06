import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function () {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type: 'FETCH_TOURNAMENTS_DATA'
        })
    },[])

    return (
        <div>
            <h1>Crush Counter</h1>
        </div>
    )
}