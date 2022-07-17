export  const snackbar = (state = {open: false, vertical: 'top', horizontal: 'center'}, action) => {
    console.log('in snackbar', action.type);
    switch (action.type) {
        case "BOOKMARK_TOURNAMENT":
            
            return state = {open: true, vertical: 'top', horizontal: 'center', message: "Tournament was bookmarked"} ;
    
        default:
            return state;
    }

}