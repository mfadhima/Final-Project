import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import './ManageProducts.css'

class ManageProducts extends Component {
    render() {
        if(this.props.role === 'administrator') {
            return(
                <div>
                    {/* <h1 className="text-center">Manage Your Product</h1> */}
                    <div className="container">
                        <h5 className="mt-3">Add new Product</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" className="form-control"/></td>
                                    <td><input type="text" className="form-control"/></td>
                                    <td><input type="text" className="form-control"/></td>
                                    <td><input type="text" className="form-control"/></td>
                                    <td><button className="button-ku">Add Product</button></td>
                                </tr>
                            </tbody>
                        </table>
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
        role: state.auth.role
    }
}

export default connect(mapStateToProps, {})(ManageProducts)