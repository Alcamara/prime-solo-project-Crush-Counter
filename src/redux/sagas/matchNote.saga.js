


function* addMatchNote(action){
    console.log('in match note', action.payload);
}












function* matchNotesSagas(){
    yield takeLatest("ADD_MATCH_NOTE", addMatchNote)
    
}




export default matchNotesSagas