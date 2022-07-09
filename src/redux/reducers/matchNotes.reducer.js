export const matchNotes = (state={}, action) =>{
    console.log(action.type);
    switch (action.type) {
        case "SET_MATCH_NOTES":
            
            return action.payload;
    
        default:
            return state;
    }

    
} 