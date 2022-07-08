import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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


export default function CCMatchNote() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [matchNote,setMatchNote] = useState({win:false,skillDemonstrated:"",skillToImprove:"",note:""});
    const tournamentTitle = useSelector(store => store.tournament);
    
    useEffect(()=>{
        console.log(id);
        dispatch({
            type:"FETCH_TOURNAMENT_DETAILS",
            payload: id
        })
    },[id])


    return (
        <div className='form'>
            <h2>{tournamentTitle.name} Notes</h2>
            
            <div className='question'>
            <h4>Did You Win The Match?</h4>
                <div className="button1">
                    <Stack 
                        alignItems="center" 
                        justifyContent="center" 
                        direction='row' 
                        spacing={2}
                    >
                        <Button variant="contained">
                            YES
                        </Button>
                        <Button variant="outlined">
                            NO
                        </Button>
                </Stack>
                </div>
            </div>
            <div className='question'>
                <h4>What Did You Do Well?</h4>
                <div className="dropdown">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Did well</InputLabel>
                        <Select
                            label="did-not"
                        >
                        <MenuItem value={'anti-air'}>Anti-Air</MenuItem>
                        <MenuItem value={'defense'}>Defense</MenuItem>
                        <MenuItem value={'offense'}>Offense</MenuItem>
                        <MenuItem value={'combo'}>Combo Execution</MenuItem>
                        <MenuItem value={'spacing'}>Spacing</MenuItem>
                        <MenuItem value={'footsies'}>Footsies</MenuItem>
                        <MenuItem value={'punishes'}>Punishes</MenuItem>
                        <MenuItem value={'knowledge'}>Match Up Knowledge</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='question'>
                <h4>What Did Not Go Well?</h4>
                <div className="dropdown">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Didn't Go Well</InputLabel>
                        <Select
                            label="did-not"
                        >
                        <MenuItem value={'anti-air'}>Anti-Air</MenuItem>
                        <MenuItem value={'defense'}>Defense</MenuItem>
                        <MenuItem value={'offense'}>Offense</MenuItem>
                        <MenuItem value={'combo execution'}>Combo Execution</MenuItem>
                        <MenuItem value={'spacing'}>Spacing</MenuItem>
                        <MenuItem value={'footsies'}>Footsies</MenuItem>
                        <MenuItem value={'punishes'}>Punishes</MenuItem>
                        <MenuItem value={'Match up knowledge'}>Match Up Knowledge</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='question'>
            <TextField
                className="textField"
                id="filled-multiline-static"
                label="Additional Notes"
                multiline
                
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
                <Button color="error" variant="outlined">
                    CANCEL
                </Button>
                <Button variant="contained">
                    SUBMIT
                </Button>
            </Stack>
            </div>

        </div>
    )
}