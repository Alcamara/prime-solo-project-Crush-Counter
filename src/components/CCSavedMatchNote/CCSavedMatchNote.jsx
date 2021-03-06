import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

//css


//MUI

import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function CCSavedMatchNote() {
    const savedMatchNote = useSelector(store => store.savedMatchNote);
    const tournamentName = savedMatchNote.name
    const note = {...savedMatchNote.dbResult};
    const {id} = useParams();
    const dispatch = useDispatch();

    const [matchNote,setMatchNote] = useState({win:false, skillDemonstrated:"", skillToImprove:"", note:"", tournamentId:0 });
    const [buttonMode,setButtonMode] = useState(false);
    
    
   

    const history = useHistory()
    
    useEffect(()=>{

        setMatchNote({
            ...matchNote,
            tournamentId: id
        })
        dispatch({
            type:"FETCH_SAVED_MATCH_NOTE",
            payload: id
          })
        
       
    },[id])


    return (
        <div className='form'>
            <h2>{tournamentName} Note</h2>
            
            <div className='question'>
            <h4>Did You Win The Match?</h4>
                <div className="button1">
                    <Stack 
                        alignItems="center" 
                        justifyContent="center" 
                        direction='row' 
                        spacing={2}
                    >
                        <Button
                            onClick={()=>{
                                setMatchNote({
                                    ...matchNote,
                                    win: true
                                })
                            }} 
                            variant="outlined"
                        >
                            YES
                        </Button>
                        <Button
                            onClick={()=>{
                                setMatchNote({
                                    ...matchNote,
                                    win: false
                                })
                            }} 
                            variant="outlined">
                            NO
                        </Button>
                </Stack>
                </div>
            </div>
            <div className='question'>
                <h4>What Did You Do Well?</h4>
                <div className="dropdown">
                    {/* if edit button is pushed dropdown enable */}
                  { (buttonMode)? <FormControl fullWidth > 
                        <InputLabel id="did-well">Did well</InputLabel>
                      { note.skillDemonstrated && <Select
                            value={note.skillDemonstrated}
                            onChange={(evt)=>{
                                dispatch({
                                    type: "ONCHANGE",
                                   payload:{ dbResult: {...note,
                                    skillDemonstrated: evt.target.value}}
                                })
                                
                            }}
                            label="did-not"
                        >
                        <MenuItem value='anti-air'>Anti-Air</MenuItem>
                        <MenuItem value='defense'>Defense</MenuItem>
                        <MenuItem value='offense'>Offense</MenuItem>
                        <MenuItem value='combo'>Combo Execution</MenuItem>
                        <MenuItem value='spacing'>Spacing</MenuItem>
                        <MenuItem value='footsies'>Footsies</MenuItem>
                        <MenuItem value='punishes'>Punishes</MenuItem>
                        <MenuItem value='knowledge'>Match Up Knowledge</MenuItem>
                        </Select> }
                    </FormControl>
                        :
                    <FormControl fullWidth disabled> 
                    <InputLabel id="did-well">Did well</InputLabel>
                  { note.skillDemonstrated && <Select
                        
                        value={note.skillDemonstrated }
                        onChange={(evt)=>{
                            setMatchNote({
                                ...matchNote,
                                skillDemonstrated: evt.target.value
                            })
                            
                        }}
                        label="did-not"
                    >
                    <MenuItem value='anti-air'>Anti-Air</MenuItem>
                    <MenuItem value='defense'>Defense</MenuItem>
                    <MenuItem value='offense'>Offense</MenuItem>
                    <MenuItem value='combo'>Combo Execution</MenuItem>
                    <MenuItem value='spacing'>Spacing</MenuItem>
                    <MenuItem value='footsies'>Footsies</MenuItem>
                    <MenuItem value='punishes'>Punishes</MenuItem>
                    <MenuItem value='knowledge'>Match Up Knowledge</MenuItem>
                    </Select> }
                </FormControl>
                    }
                    {/* end */}
                </div>
            </div>
            <div className='question'>
                <h4>What Did Not Go Well?</h4>
                <div className="dropdown">
                   { (buttonMode)?
                    <FormControl fullWidth >
                        <InputLabel id="didnt-well">Didn't Go Well</InputLabel>
                    {  note.skillToImprove  &&<Select
                            value={note.skillToImprove}
                            onChange={(evt)=>{

                                dispatch({
                                    type: "ONCHANGE",
                                   payload:{ dbResult: {...note,
                                    skillToImprove: evt.target.value}}
                                })
                                console.log(matchNote);
                            }}
                            label="did-not"
                        >
                        <MenuItem value='anti-air'>Anti-Air</MenuItem>
                        <MenuItem value='defense'>Defense</MenuItem>
                        <MenuItem value='offense'>Offense</MenuItem>
                        <MenuItem value='combo execution'>Combo Execution</MenuItem>
                        <MenuItem value='spacing'>Spacing</MenuItem>
                        <MenuItem value='footsies'>Footsies</MenuItem>
                        <MenuItem value='punishes'>Punishes</MenuItem>
                        <MenuItem value='Match up knowledge'>Match Up Knowledge</MenuItem>
                        </Select>}
                    </FormControl>
                    :
                   <FormControl fullWidth disabled>
                        <InputLabel id="didnt-well">Didn't Go Well</InputLabel>
                     {  note.skillToImprove  &&<Select
                            value={note.skillToImprove}
                            onChange={(evt)=>{

                                setMatchNote({
                                    ...matchNote,
                                    skillToImprove: evt.target.value
                                })
                                console.log(matchNote);
                            }}
                            label="did-not"
                        >
                        <MenuItem value='anti-air'>Anti-Air</MenuItem>
                        <MenuItem value='defense'>Defense</MenuItem>
                        <MenuItem value='offense'>Offense</MenuItem>
                        <MenuItem value='combo execution'>Combo Execution</MenuItem>
                        <MenuItem value='spacing'>Spacing</MenuItem>
                        <MenuItem value='footsies'>Footsies</MenuItem>
                        <MenuItem value='punishes'>Punishes</MenuItem>
                        <MenuItem value='Match up knowledge'>Match Up Knowledge</MenuItem>
                        </Select>}
                    </FormControl>}
                </div>
            </div>
            <div className='question'>
           {(buttonMode)?
           <TextField
                value={note.note}
                className="textField"
                multiline
                onChange={(evt)=>{
                    dispatch({
                        type: "ONCHANGE",
                       payload:{ dbResult: {...note,
                        note: evt.target.value}}
                    })
                }}
                rows={4}
                variant="filled"
                
            />
                :
                <TextField
                    value={note.note}
                    className="textField"
                    id="filled-multiline-static"
                    multiline
                    onChange={(evt)=>{
                        setMatchNote({
                            ...matchNote,
                            note: evt.target.value
                        })
                    }}
                    rows={4}
                    variant="filled"
                    disabled
                />

           }
            </div>
            <div className="button1">
            <Stack 
                alignItems="center" 
                justifyContent="center" 
                direction='row' 
                spacing={2}
            >
                <Button
                    onClick={()=>{
                        history.goBack()
                    }} 
                    
                    variant="outlined">
                    CANCEL
                </Button>
                { (buttonMode)?
                    <Button 
                        onClick={(evt)=>{
                            evt.preventDefault();
                            dispatch({
                                type:"UPDATE_MATCH_NOTE",
                                payload: note});
                                history.push('/user')       
                        }}
                        variant="outlined"
                    >
                        UPDATE
                    </Button>:
                    <Button
                        onClick={()=>{
                            setButtonMode(true)
                            
                        }}
                        variant='outlined'
                    >
                        Edit
                    </Button>
                }
            </Stack>
            
            </div>

        </div>
    )
}