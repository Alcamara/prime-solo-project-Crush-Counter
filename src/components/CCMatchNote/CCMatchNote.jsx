import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

//css
import './CCMatchNote.css'

//MUI
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';


export default function CCMatchNote() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [matchNote,setMatchNote] = useState({win:false, skillDemonstrated:"", skillToImprove:"", note:"", tournamentId:0 });
    const tournamentTitle = useSelector(store => store.tournament);
    const history = useHistory()
    
    useEffect(()=>{

        setMatchNote({
            ...matchNote,
            tournamentId: id
        })
        console.log(matchNote);
        
       
    },[id])


    return (
        <div className='form'>
            <h2>{tournamentTitle.name} Note</h2>
            
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
                    <FormControl fullWidth>
                        <InputLabel id="did-well">Did well</InputLabel>
                        <Select
                            value={matchNote.skillDemonstrated}
                            onChange={(evt)=>{
                                setMatchNote({
                                    ...matchNote,
                                    skillDemonstrated: evt.target.value
                                })
                                console.log(matchNote);
                            }}
                            
                        >
                        <MenuItem value='anti-air'>Anti-Air</MenuItem>
                        <MenuItem value='defense'>Defense</MenuItem>
                        <MenuItem value='offense'>Offense</MenuItem>
                        <MenuItem value='combo'>Combo Execution</MenuItem>
                        <MenuItem value='spacing'>Spacing</MenuItem>
                        <MenuItem value='footsies'>Footsies</MenuItem>
                        <MenuItem value='punishes'>Punishes</MenuItem>
                        <MenuItem value='knowledge'>Match Up Knowledge</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='question'>
                <h4>What Did Not Go Well?</h4>
                <div className="dropdown">
                    <FormControl fullWidth>
                        <InputLabel id="didnt-well">Didn't Go Well</InputLabel>
                        <Select
                            className={'display:block'}
                            value={matchNote.skillToImprove}
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
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='question'>
            <TextField
                value={matchNote.note}
                className="textField"
                id="filled-multiline-static"
                label="Additional Notes"
                multiline
                //remove later
                onClick={()=>{
                    setMatchNote({
                        ...matchNote,
                        note:"Is M.Bison's St. MP plus on block?"
                    })
                }}
                onChange={(evt)=>{
                    setMatchNote({
                        ...matchNote,
                        note: evt.target.value
                    })
                }}
                rows={4}
                variant="filled"
            />
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
                        history.push('/user')
                    }} 
                    color="error" 
                    variant="outlined">
                    CANCEL
                </Button>
                <Button 
                    onClick={(evt)=>{
                        evt.preventDefault();
                        dispatch({
                            type:"ADD_MATCH_NOTE",
                            payload:matchNote});
                            history.push('/user')
                    }}
                    variant="outlined"
                >
                    SUBMIT
                </Button>
            </Stack>
            
            </div>

        </div>
    )
}