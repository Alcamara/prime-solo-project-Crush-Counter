import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* addMatchNote(action){
    console.log('in match note', action.payload);

    try {
        yield axios.post('/api/match-notes',action.payload)
    } catch (error) {
        
    }
}







function* matchNotesSagas(){
    yield takeLatest("ADD_MATCH_NOTE", addMatchNote)
    
}




export default matchNotesSagas;