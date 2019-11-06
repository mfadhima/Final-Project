const INITIAL_STATE = {
    id: '',
    email: '',
    role: ''
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, email: action.payload.email, role: action.payload.role}
        case 'LOGOUT_SUCCESS':
            return {...state, id: '', email: '', role: ''}
        default:
            return state
    }
}