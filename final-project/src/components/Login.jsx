import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="card-login container">
                    <p className="title-ku"> Login </p>
                    <label for="email"> Email </label>
                    <input placeholder="Email" id="email" type="text"/>
                    <label for="password"> Password </label>
                    <input placeholder="Password" id="password" type="password"/>
                    <p> <a href="#"> Forgot your password? </a> </p>
                    <button className="button-ku"> Login </button>
                </div>
            </div>
        )
    }
}

export default Login