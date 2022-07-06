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

function* tournamentsSagas(){
    yield takeLatest('FETCH_TOURNAMENTS_DATA', fetchTournaments)
}

export default tournamentsSagas