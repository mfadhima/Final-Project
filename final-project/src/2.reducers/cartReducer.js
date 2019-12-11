const INITIAL_STATE = {
    totalQty: 0
}

export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CART':
            return {...state, totalQty: action.payload.quantity} 
        default:
            return state
    }
}