const INITIAL_STATE = {
    id: '',
    email: ''
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, email:action.payload.email}
        case 'LOGOUT_SUCCESS':
            return {...state, id: '', email: ''}
        default:
            return state
    }
}