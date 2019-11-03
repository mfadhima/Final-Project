import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './components/App'
import Reducers from './components/2.reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const STORE = createStore(
    Reducers, composeEnhancers(applyMiddleware(ReduxThunk))
)

ReactDOM.render(<Provider store={STORE}> <App/> </Provider>, document.getElementById('root'))