import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import './App.css'

import Home from './Home'
import Register from './Register'
import Login from './Login'
import Header from './Header'

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/login' exact component={Login}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App