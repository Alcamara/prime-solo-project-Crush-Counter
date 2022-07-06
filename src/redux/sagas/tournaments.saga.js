import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


/*
    function does an axios get request retrieve tournament data
    from api and return it
*/
function* tournaments() {
    try {
        
        const res = yield axios.get('api/tournaments')
        //console.log(res.data);
        yield put({})
    } catch (err) {
        console.log(`axios get failed ${err}`);
    }
}

function* tournamentsSagas(){
    yield takeLatest('FETCH_TOURNAMENTS_DATA', tournaments)
}

export default tournamentsSagas