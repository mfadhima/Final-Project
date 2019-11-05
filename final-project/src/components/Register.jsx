import React, { Component } from 'react'
import Axios from 'axios'
import './Register.css'

const URL_API = 'http://localhost:8888/'

class Register extends Component {
    state = {
        inputFirstName: '',
        inputLastName: '',
        inputEmail: '',
        inputPassword: '',
        notifMessage: '',
        statusCode: ''
    }

    onRegisterClick = () => {
        if(!this.state.inputFirstName || !this.state.inputLastName || !this.state.inputEmail || !this.state.inputPassword) {
            setTimeout(() => {
                this.setState({notifMessage: ''})
            }, 5000);
            this.setState({notifMessage: 'Fill in the form please...'})
        } else {
            Axios.post(
                URL_API + 'auth/register',
                {
                    firstName: this.state.inputFirstName,
                    lastName: this.state.inputLastName,
                    email: this.state.inputEmail,
                    password: this.state.inputPassword
                }
            ).then((res) => {
                if(res.data.status === '400') {
                    this.setState({notifMessage: res.data.message})
                } else if(res.data.status === '201') {
                    this.setState({
                        statusCode: '201',
                        notifMessage: res.data.message
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    notificationAlert = () => {
        if(!this.state.notifMessage) {
            return null
        } else {
            if(this.state.statusCode === '201') {
                return (
                    <div className="alert-ku alert-success text-center">{this.state.notifMessage}</div>
                )
            } else if(!this.state.statusCode || this.state.statusCode === '400') {
                setTimeout(() => {
                    this.setState({notifMessage: ''})
                }, 5000);
                return(
                    <div className="alert-ku alert-danger text-center">{this.state.notifMessage}</div>
                )
            }
        }    
    }

    render() {
        return (
            <div className="container">
                <div className="card-register container">
                    <p className="title-ku"> Create Account </p>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={(e) => {this.setState({inputFirstName: e.target.value})}} placeholder="First Name" id="firstName" type="text" required/>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={(e) => {this.setState({inputLastName: e.target.value})}} placeholder="Last Name" id="lastName" type="text" required/>
                    <label htmlFor="email"> Email </label>
                    <input onChange={(e) => {this.setState({inputEmail: e.target.value})}} placeholder="Email" id="email" type="email" required/>
                    <label htmlFor="password"> Password </label>
                    <input onChange={(e) => {this.setState({inputPassword: e.target.value})}} placeholder="Password" id="password" type="password" required/>
                    <button onClick={this.onRegisterClick} className="button-ku"> Create Account </button>
                    {this.notificationAlert()}
                </div>
            </div>
        )
    }
}

export default Register