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
        yield put({ type: "SET_TOURNAMENT_DATA", payload: tournamentsList.data })
    } catch (err) {
        console.log(`axios get failed ${err}`);
    }
}

function* fetchTournamentDetail(action) {
    console.log(action.payload);
    try {
        const res = yield axios.post('/api/tournaments/'+action.payload)
        console.log(res.data);
    } catch (error) {
        
    }
}

function* tournamentsSagas(){
    yield takeLatest('FETCH_TOURNAMENTS_DATA', fetchTournaments)
    yield takeLatest("FETCH_TOURNAMENT_DETAILS", fetchTournamentDetail)
}

export default tournamentsSagas