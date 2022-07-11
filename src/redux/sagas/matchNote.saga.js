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

function* deleteMatchNote(action) {
    console.log('in saga', action.payload);

    try {
        yield axios.delete('/api/match-notes/'+action.payload)

        yield put({ type:"FETCH_MATCH_NOTES" })
        
    } catch (error) {
        console.error(`${error}`);
    }
}

function* fetchSavedMatchNotes(action){
    console.log('fetchSavedMatchNotes');
    try {

        const savedNote = yield axios.post('/api/match-notes/savedMatchNote/'+action.payload)
        yield put({type:'SET_SAVED_MATCH_NOTE', payload: savedNote.data});
    } catch (error) {
        console.error(`${error}`);
    }
}

function* updateMatchNote(action){
    console.log('hey', action.type);
    try {
       yield axios.put('/api/match-notes//savedMatchNote/'+action.payload.tournamentId, action.payload)
    } catch (error) {
        console.error(`${error}`);
    }
}

function* matchNotesSagas(){
    yield takeLatest("ADD_MATCH_NOTE", addMatchNote)
    yield takeLatest("FETCH_MATCH_NOTES", fetchMatchNotes)
    yield takeLatest("DELETE_MATCH_NOTE", deleteMatchNote)
    yield takeLatest("FETCH_SAVED_MATCH_NOTE", fetchSavedMatchNotes)
    yield takeLatest("UPDATE_MATCH_NOTE", updateMatchNote)
}


export default matchNotesSagas;