import {combineReducers} from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'

const Reducers = combineReducers(
    {
        auth: authReducer,
        cart: cartReducer
    }
)

export default Reducers