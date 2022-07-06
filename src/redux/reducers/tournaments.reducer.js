

const tournaments = (state = [], action) =>{
    console.log('in tournament reducer');
    switch (action.type) {
        case "SET_TOURNAMENT_DATA":
            
            return action.payload;
    
        default:
            return state;
    }
}


export default tournaments