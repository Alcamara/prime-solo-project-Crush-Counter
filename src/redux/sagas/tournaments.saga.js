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

function* fetchTournamentsList(action) {
    try {
        
        const tournamentSearchList = yield axios.post('/api/tournaments/search', action.payload)
        console.log(tournamentSearchList.data);

        yield put({ type:"SET_TOURNAMENTS_LIST", payload: tournamentSearchList.data})
        
    } catch (error) {
        console.log(`${error}`);
    }
}

function* bookmarkTournament(action){
    console.log(action.payload);
    try {
        yield axios.post('/api/tournaments/bookmark/'+action.payload)
    } catch (error) {
        console.log(`${error}`);
    }
}

function* tournamentsSagas(){
    yield takeLatest('FETCH_TOURNAMENTS_DATA', fetchTournaments)
    yield takeLatest("FETCH_TOURNAMENT_DETAILS", fetchTournamentDetail)
    yield takeLatest("FETCH_TOURNAMENTS_LIST", fetchTournamentsList)
    yield takeLatest("BOOKMARK_TOURNAMENT", bookmarkTournament)
    
}

export default tournamentsSagas