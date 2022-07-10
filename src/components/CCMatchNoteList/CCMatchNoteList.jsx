import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import CCMatchNoteListItem from "../CCMatchNoteListItem/CCMatchNoteListItem";

//mui
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import ListDivider from '@mui/joy/ListDivider';
import Sheet from '@mui/joy/Sheet';

export default function CCMatchNoteList(){

    const dispatch = useDispatch();
    const matchNotes = useSelector(store => store.matchNotes);
    const history = useHistory()
    if(matchNotes){
        console.log(matchNotes);
    }
    useEffect(()=>{
        dispatch({
            type: "FETCH_MATCH_NOTES"
        })
    },[])

    return(
        <div>
            
            <Typography
              id="ellipsis-list-demo"
              level="body4"
              textTransform="uppercase"
              fontWeight="xl"
              mb={2}
              sx={{ letterSpacing: '0.15rem' }}
            >
              Match Notes
            </Typography>
            
            <List
              aria-labelledby="ellipsis-list-demo"
              sx={{ '--List-decorator-width': '50px' }}
            >
                { matchNotes.dbResults &&
                    matchNotes.dbResults.map((note, index) =>(
                        <>
                        <CCMatchNoteListItem key={note.id} matchNotes={matchNotes.apiQueryResults[index]} note={note}/>
                        <ListDivider inset="gutter"/>
                        </>
                    ))
                }
                
            </List>
           
        </div>
    )
}