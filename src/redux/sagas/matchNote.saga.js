import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* addMatchNote(action){
    console.log('in match note', action.payload);

    try {
        yield axios.post('/api/match-notes',action.payload)
    } catch (error) {
        
    }
}


function* fetchMatchNotes(){
    try {

       const res = yield axios.get('/api/match-notes')

       console.log(res.data);

       yield put({type:"SET_MATCH_NOTES", payload: res.data})
        
    } catch (error) {
        console.error(`${error}`);
    }
}




function* matchNotesSagas(){
    yield takeLatest("ADD_MATCH_NOTE", addMatchNote)
    yield takeLatest("FETCH_MATCH_NOTES", fetchMatchNotes)
    
}




export default matchNotesSagas;