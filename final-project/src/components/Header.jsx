import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Header.css'
import {onLogoutUser} from './1.actions/index'

class Header extends Component {
    render() {
        if(!this.props.user_email) {
            return (
                <div className="container">
    
                    <div className="header-ku">
    
                        <div className="search-area">
                            <div style={{marginTop:'3px'}} className="mr-2"> <input placeholder="Search our product" type="text"/> </div>
                            <div> <button className="button-ku"> Search </button> </div>
                        </div>
    
                        <div className="account-area">
                            <div style={{borderRight : '1px solid lightgrey', paddingRight : '1rem'}}> <Link to="/register"> Register </Link> </div>
                            <div className="ml-3"> <Link to="/login"> Login </Link> </div>
                        </div>
    
                    </div>
    
                    <div className="header-ku">
                        <div className="web-logo">
                            <Link to="/"> Logo </Link>
                        </div>
                    </div>
    
                </div>
            )
        } else {
            return (
                <div className="container">
    
                    <div className="header-ku">
    
                        <div className="search-area">
                            <div style={{marginTop:'3px'}} className="mr-2"> <input placeholder="Search our product" type="text"/> </div>
                            <div> <button className="button-ku"> Search </button> </div>
                        </div>
    
                        <div className="account-area">
                            <div> <button className="btn" onClick={this.props.onLogoutUser}> Logout </button> </div>
                        </div>
    
                    </div>
    
                    <div className="header-ku">
                        <div className="web-logo">
                            <Link to="/"> Logo </Link>
                        </div>
                    </div>
    
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user_email: state.auth.email
    }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)