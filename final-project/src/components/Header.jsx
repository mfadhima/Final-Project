import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
import {IoMdCart} from 'react-icons/io'
import './styles/Header.css'
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
        if(!this.props.userEmail) {
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

                    <div className="header-ku header-akhir justify-content-center">
                        <div><Link to="/brand1">Brand 1</Link></div>
                        <div className="mx-5"><Link to="/brand2">Brand 2</Link></div>
                        <div>
                            <Link to="/allproducts">All Products</Link>
                        </div>
                    </div>
    
                </div>
            )
        } else if(this.props.role === 'user') {
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
                                <DropdownToggle className="user-dropdown" caret>
                                    Hello {this.props.firstName}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem><Link to="/accountinfo">Account Info</Link></DropdownItem>
                                    <DropdownItem>Address</DropdownItem>
                                    <DropdownItem>Change Password</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <div>
                                <button style={{borderLeft : '1px solid lightgrey', borderRight : '1px solid lightgrey'}} className="btn" onClick={this.props.onLogoutUser}> Logout </button>
                            </div>

                            <div className="ml-2" style={{paddingTop: "7px", cursor: "pointer"}}>
                                <Link to="/cart">
                                    <div><IoMdCart/></div>
                                </Link>
                            </div>
                        </div>
    
                    </div>
    
                    <div className="header-ku">
                        <div className="web-logo">
                            <Link to="/"> Logo </Link>
                        </div>
                    </div>

                    <div className="header-ku justify-content-center">
                        <div><Link to="/brand1">Brand 1</Link></div>
                        <div className="mx-5"><Link to="/brand2">Brand 2</Link></div>
                        <div>
                            <Link to="/allproducts">All Products</Link>
                        </div>
                    </div>
    
                </div>
            )
        } else {
            // HEADER FOR ADMIN
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
                                <DropdownToggle className="user-dropdown" caret>
                                    Admin Dashboard
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem> <Link to="/manageproducts">Manage Product</Link> </DropdownItem>
                                    <DropdownItem><Link to="/transaction">Transaction</Link></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <div>
                                <button style={{borderLeft : '1px solid lightgrey', paddingRight : '1rem'}} className="btn" onClick={this.props.onLogoutUser}> Logout </button>
                            </div>
                        </div>
    
                    </div>
    
                    <div className="header-ku">
                        <div className="web-logo">
                            <Link to="/"> Logo </Link>
                        </div>
                    </div>

                    <div className="header-ku justify-content-center">
                        <div><Link to="/brand1">Brand 1</Link></div>
                        <div className="mx-5"><Link to="/brand2">Brand 2</Link></div>
                        <div>
                            <Link to="/allproducts">All Products</Link>
                        </div>
                    </div>
    
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.auth.email,
        role: state.auth.role,
        firstName: state.auth.firstName
    }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)