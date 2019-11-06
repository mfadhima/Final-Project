import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, BrowserRouter} from 'react-router-dom'
import './App.css'

import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ManageProducts from './ManageProducts'

import {keepLogin} from './1.actions/index'

class App extends Component {
    state = {
        check: false
    }

    componentDidMount() {
        let userStorage = JSON.parse(localStorage.getItem('userData'))
        if(userStorage){
            this.props.keepLogin(userStorage)
        }
        this.setState({check: true})
    }

    render() {
        if(this.state.check) {
            return (
                <div>
                    <BrowserRouter>
                        <Header/>
                        <Route path='/' exact component={Home}/>
                        <Route path='/manageproducts' component={ManageProducts}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Footer/>
                    </BrowserRouter>
                </div>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

export default connect(null, {keepLogin})(App)