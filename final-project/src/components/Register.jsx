import React, { Component } from 'react'
import './Register.css'

class Register extends Component {
    render() {
        return (
            <div className="container">
                <div className="card-register container">
                    <p className="title-ku"> Create Account </p>
                    <label for="firstName"> First Name </label>
                    <input placeholder="First Name" id="firstName" type="text"/>
                    <label for="lastName"> Last Name </label>
                    <input placeholder="Last Name" id="lastName" type="text"/>
                    <label for="email"> Email </label>
                    <input placeholder="Email" id="email" type="text"/>
                    <label for="password"> Password </label>
                    <input placeholder="Password" id="password" type="password"/>
                    <button className="button-ku"> Create Account </button>
                </div>
            </div>
        )
    }
}

export default Register