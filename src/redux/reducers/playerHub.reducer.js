export const playerHub = (state =[], action)=>{
    switch (action.type) {
      case 'SET_PLAYER_HUB':
        return action.payload;
      default:
        return state;
    } 
  }