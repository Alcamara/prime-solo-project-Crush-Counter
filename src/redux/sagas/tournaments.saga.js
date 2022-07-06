import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* tournaments() {
    try {
        const res = yield axios.get('/tournaments')
        console.log(res.data);
    } catch (err) {
        console.log(`axios get failed ${err}`);
    }
}

function* tournamentsSagas(){
    yield takeLatest('FETCH_TOURNAMENTS_DATA', tournaments)
}

export default tournamentsSagas