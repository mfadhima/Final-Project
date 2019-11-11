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
        inputEmailForgot: '',
        forgotPassword: false
    }

    onLoginClick = () => {
        let EMAIL = this.state.inputEmail
        let PASSWORD = this.state.inputPassword
        this.props.onLoginUser(EMAIL, PASSWORD)
    }

    notification = () => {
        if(!this.props.statusCode) {
            return null
        } else {
            return(
                <div className="alert-ku alert-danger text-center">{this.props.errorMessage}</div>
            )
        }
    }

    render() {
        if(!this.props.userEmail) {
            if(!this.state.forgotPassword) {
                return(
                    <div className="container">
                        <div className="card-login container">
                            <p className="title-ku"> Login </p>
                            <label htmlFor="email"> Email </label>
                            <input onChange={(e) => {this.setState({inputEmail: e.target.value})}} placeholder="Email" id="email" type="text" required/>
                            <label htmlFor="password"> Password </label>
                            <input onChange={(e) => {this.setState({inputPassword: e.target.value})}} placeholder="Password" id="password" type="password" required/>
                            <p className="forgot-password" onClick={()=>{this.setState({forgotPassword: !this.state.forgotPassword})}}> Forgot your password? </p>
                            <button onClick={this.onLoginClick} className="button-ku"> Login </button>
                            {this.notification()}
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="container">
                        <div className="card-login container">
                            <p className="title-ku"> Reset your password </p>
                            <p> We will send you an email to reset your password </p>
                            <label htmlFor="email-forgot"> Email </label>
                            <input onChange={(e) => {this.setState({inputEmailForgot: e.target.value})}} placeholder="Password" id="email-forgot" type="email"/>
                            <button onClick={this.onSubmitClick} className="button-ku mr-3"> Submit </button>
                            <button onClick={()=>{this.setState({forgotPassword: !this.state.forgotPassword})}} className="button-ku"> Cancel </button>
                            {/* {this.notification()} */}
                        </div>
                    </div>
                )
            }
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        userEmail: state.auth.email,
        statusCode: state.auth.statusCode,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {onLoginUser})(Login)