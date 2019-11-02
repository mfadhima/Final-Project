import React, {Component} from 'react'
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div className="container">

                <div className="header-ku">

                    <div className="search-area">
                        <div className="mr-2"> <input placeholder="Search our product" type="text"/> </div>
                        <div> <button className="button-ku"> Search </button> </div>
                    </div>

                    <div className="account-area">
                        <div> <a href="/register"> Register </a> </div>
                        <div className="ml-3"> <a href="/login"> Login </a> </div>
                    </div>

                </div>

                <div className="header-ku">
                    <div className="web-logo">
                        <a href="/">Logo</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default Header