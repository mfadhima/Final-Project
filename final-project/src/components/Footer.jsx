import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles/Footer.css'

class Footer extends Component {
    render() {
        return(
            <div>
                <footer className="container footer-ku">
                    <div className="d-flex">
                        <div className="col-6">
                            <h5>About Us</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ad corrupti reprehenderit provident, aperiam, ratione non recusandae excepturi facere iure ipsum mollitia! Itaque nam voluptatem consequuntur magnam quos fugiat in quia harum natus? Corporis, quaerat placeat. Sed aliquam fugiat laboriosam.</p>
                            <p>Company Adress...</p>
                            <p>Phone number: +62 21 555 555</p>
                            <p>E-mail: company@mail.com</p>
                        </div>
                        <div className="col-3">
                            <h5>Information</h5>
                            <Link to="/termsandconditions">Terms and Conditions</Link><br/>
                            <Link to="/refundpolicy">Refund Policy</Link><br/>
                            <Link to="/faq">F.A.Q</Link><br/>
                            <Link to="/contactus">Contact Us</Link><br/>
                        </div>
                        <div className="col-3">
                            <h5>Menu</h5>
                            <Link to="/brand1">Brand 1</Link><br/>
                            <Link to="/brand2">Brand 2</Link><br/>
                            <Link to="/allproducts">All Products</Link>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer