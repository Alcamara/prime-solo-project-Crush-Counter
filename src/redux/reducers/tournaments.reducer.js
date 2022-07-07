

export const tournaments = (state = [], action) =>{
    console.log('in tournament reducer');
    switch (action.type) {
        case "SET_TOURNAMENTS_DATA":
            
            return action.payload;
    
        default:
            return state;
    }
}

export const tournament = (state = {}, action)=>{
    console.log('in tournament details reducers')

    switch (action.type) {
        case "SET_TOURNAMENT_DETAILS":
            
            return action.payload;
        case "CLEAR_TOURNAMENT_DETAILS":
            return {}
    
        default:
            return state;
    }

}

export const tournamentSearch = (state = [], action)=>{
    switch (action.type) {
        case "SET_TOURNAMENTS_LIST":
            
            return action.payload;
    
        default:
            return state;
    }
}


