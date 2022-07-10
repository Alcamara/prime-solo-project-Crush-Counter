export const matchNotes = (state={}, action) =>{
    console.log(action.type);
    switch (action.type) {
        case "SET_MATCH_NOTES":
            
            return action.payload;
    
        default:
            return state;
    }

    
} 

export const savedMatchNote = (state={}, action)=>{
    switch (action.type) {
        case 'SET_SAVED_MATCH_NOTE':
            
            return action.payload;
    
        default:
            return state;
    }
}