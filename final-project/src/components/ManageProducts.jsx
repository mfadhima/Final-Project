import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'

import './ManageProducts.css'

const URL_API = 'http://localhost:8888/'

class ManageProducts extends Component {
    state = {
        productName: '',
        productDesc: '',
        productPrice: 0,
        productImage: null,
        productData: [],
        message: ''
    }

    onAddClick = () => {
        if(!this.state.productName || !this.state.productDesc || !this.state.productPrice || !this.state.productImage) {
            this.setState({message: 'Please fill all forms..'})
        } else {
            let fd = new FormData()
            fd.append('products', this.state.productImage, this.state.productImage.name)
            fd.append('productName', this.state.productName)
            fd.append('productDesc', this.state.productDesc)
            fd.append('productPrice', this.state.productPrice)
            Axios.post(
                URL_API + 'products/addproduct', fd
            ).then((res) => {
                console.log(res)
                this.setState({message: res})
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if(this.props.role === 'administrator') {
            return(
                <div>
                    {/* <h1 className="text-center">Manage Your Product</h1> */}
                    <div className="container">
                        <h5 className="mt-3">Add new Product</h5>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><input required type="text" className="form-control" onChange={(e) => {this.setState({productName: e})}} placeholder="Product Name"/></td>
                                    <td><input required type="text" className="form-control" onChange={(e) => {this.setState({productDesc: e})}} placeholder="Description"/></td>
                                    <td><input required type="text" className="form-control" onChange={(e) => {this.setState({productPrice: e})}} placeholder="Price"/></td>
                                    <td>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref="uploadImage"
                                            hidden
                                            onChange={(e) => {this.setState({productImage: e.target.files[0]})}}
                                        />
                                        <input
                                            type="button"
                                            value="Choose an image"
                                            className="button-ku"
                                            onClick={() => {this.refs.uploadImage.click()}}
                                        />
                                    </td>
                                    <td><button className="button-ku" onClick={this.onAddClick}>Add Product</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <h5>Our Products</h5>
                        <table className="table">

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