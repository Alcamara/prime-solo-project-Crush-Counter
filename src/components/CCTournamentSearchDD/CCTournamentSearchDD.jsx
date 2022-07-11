import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';

import './CCTournamentSearchDD.css'

export default function CCTournamentSearchDD() {

    const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    const miles = ['25mi','50mi','100mi','250mi','500mi','1000mi']

    const [searchParam, setSearchParam] = useState({state:'', miles:'', setting:false });

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type: "FETCH_TOURNAMENTS_LIST",
            payload: searchParam
        })
    },[])
    

    return(


        <div>
            <h2>Tournament Search</h2>
        <div className='dropdowns-section'>
        <FormControl >
        <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
            className='dropdown'
            labelId="demo-simple-select-label"
            value={searchParam.state}
            label="States"
            onChange={(evt)=>{
                setSearchParam({...searchParam,state: evt.target.value})
            }}
            >
            { states.map((state)=>(
                <MenuItem key={state} value={state}>{state}</MenuItem>
            ))}
            
            </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Distance</InputLabel>
        <Select
            disabled
            className='dropdown'
            labelId="demo-simple-select-label"
            value={searchParam.miles}
            label="States"
            onChange={(evt)=>{
                setSearchParam({...searchParam, miles: `"${evt.target.value}"`})
            }}
            >
            { miles.map((miles)=>(
                <MenuItem value={miles}>{miles}</MenuItem>
            ))}
            
            </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Tournament Setting</InputLabel>
        <Select
            className='dropdown'
            value={searchParam.setting}
            label="Setting"
            onChange={(evt)=>{
                setSearchParam({...searchParam, setting: evt.target.value} )
            }}
            >
            <MenuItem value={true}>{"Online"}</MenuItem>
            <MenuItem value={false}>{"Offline"}</MenuItem>

            
            </Select>
      </FormControl>
      </div>
      <div className='btn-secton'>
        <Button
            onClick={()=> dispatch({type:"FETCH_TOURNAMENTS_LIST", payload: searchParam})}
            variant='outlined'
            className='btn'
        >
            Search
        </Button>
      </div>
        </div>
    )
}