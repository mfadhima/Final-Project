import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
import './Header.css'
import {onLogoutUser} from './1.actions/index'

class Header extends Component {
    state = {
        dropdownOpen: false
    }

    toggle = () => {
        if(this.state.dropdownOpen === false) {
            this.setState({dropdownOpen: true})
        } else {
            this.setState({dropdownOpen: false})
        }
    }

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

                    <div className="header-ku justify-content-center">
                        <div>Brand 1</div>
                        <div className="mx-5">Brand 2</div>
                        <div>Brand 3</div>
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
                            {/* <div className="dropdown">
                                <button className="btn dropdown-toggle" > Your Account </button>
                                <div className="dropdown-menu">
                                    <a href="http://" target="_blank" rel="noopener noreferrer">Account Info</a>
                                    <a href="http://" target="_blank" rel="noopener noreferrer">Address</a>
                                    <a href="http://" target="_blank" rel="noopener noreferrer">Change Password</a>
                                </div>
                            </div> */}
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Your Account
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Account Info</DropdownItem>
                                    <DropdownItem>Address</DropdownItem>
                                    <DropdownItem>Change Password</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <div>
                                <button className="btn" onClick={this.props.onLogoutUser}> Logout </button>
                            </div>
                        </div>
    
                    </div>
    
                    <div className="header-ku">
                        <div className="web-logo">
                            <Link to="/"> Logo </Link>
                        </div>
                    </div>

                    <div className="header-ku justify-content-center">
                        <div>Brand 1</div>
                        <div className="mx-5">Brand 2</div>
                        <div>Brand 3</div>
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