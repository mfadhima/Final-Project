const INITIAL_STATE = {
    id: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    statusCode: '',
    errorMessage: ''
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                role: action.payload.role,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                statusCode: '',
                errorMessage: ''
            }
        case 'LOGIN_FAILED':
            return {...state, statusCode: action.payload.status, errorMessage: action.payload.message}
        case 'LOGOUT_SUCCESS':
            return {state}
        default:
            return state
    }
}