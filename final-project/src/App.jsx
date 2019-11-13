import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, BrowserRouter} from 'react-router-dom'
import './styles/App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './container/Home'
import Login from './container/Login'
import Register from './container/Register'
import ManageProducts from './container/ManageProducts'
import AllProducts from './container/AllProducts'
import Brand1 from './container/Brand1'
import Brand2 from './container/Brand2'
import ProductDetail from './container/ProductDetail'
import Cart from './container/Cart'
import AccountInfo from './container/AccountInfo'
import Transaction from './container/Transaction'

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
                        <Route path='/allproducts' component={AllProducts}/>
                        <Route path='/brand1' component={Brand1}/>
                        <Route path='/brand2' component={Brand2}/>
                        <Route path='/productdetail/:id' component={ProductDetail} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/accountinfo' component={AccountInfo} />
                        <Route path='/transaction' component={Transaction} />
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