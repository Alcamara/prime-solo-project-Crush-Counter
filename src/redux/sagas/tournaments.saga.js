import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


/*
    function does an axios get request retrieve tournament data
    from api and return it
*/
function* fetchTournaments() {
    try {
        
        const tournamentsList = yield axios.get('api/tournaments')
        //console.log(tournamentsList.data);
        yield put({ type: "SET_TOURNAMENTS_DATA", payload: tournamentsList.data })
    } catch (err) {
        console.log(`axios get failed ${err}`);
    }
}
/**
 * function does an axios post request retrieve tournament data by id
    from api and return it
 */
function* fetchTournamentDetail(action) {
    //console.log(action.payload);
    try {
        const res = yield axios.post('/api/tournaments/'+action.payload)
        
        yield put({ type: "SET_TOURNAMENT_DETAILS", payload: res.data.tournament})
    } catch (error) {
        
    }
}

function* fetchTournamentsList() {
    try {
        
        const tournamentSearchList = yield axios.get('/api/tournaments/search')
        
    } catch (error) {
        console.log(`${errorr}`);
    }
}

function* tournamentsSagas(){
    yield takeLatest('FETCH_TOURNAMENTS_DATA', fetchTournaments)
    yield takeLatest("FETCH_TOURNAMENT_DETAILS", fetchTournamentDetail)
    yield takeLatest("FETCH_TOURNAMENTS_LIST", fetchTournamentsList)
}

export default tournamentsSagas