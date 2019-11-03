// import Axios from 'axios'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './Login.css'

import {onLoginUser} from './1.actions/index'

class Login extends Component {
    state = {
        inputEmail: '',
        inputPassword: '',
        statusCode: '',
        errorMessage: ''
    }

    onLoginClick = () => {
        let EMAIL = this.state.inputEmail
        let PASSWORD = this.state.inputPassword
        this.props.onLoginUser(EMAIL, PASSWORD)
    }

    render() {
        if(!this.props.userEmail) {
            return (
                <div className="container">
                    <div className="card-login container">
                        <p className="title-ku"> Login </p>
                        <label htmlFor="email"> Email </label>
                        <input onChange={(e) => {this.setState({inputEmail: e.target.value})}} placeholder="Email" id="email" type="text" required/>
                        <label htmlFor="password"> Password </label>
                        <input onChange={(e) => {this.setState({inputPassword: e.target.value})}} placeholder="Password" id="password" type="password" required/>
                        <p> Forgot your password? </p>
                        <button onClick={this.onLoginClick} className="button-ku"> Login </button>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        userEmail: state.auth.email
    }
}

export default connect(mapStateToProps, {onLoginUser})(Login)