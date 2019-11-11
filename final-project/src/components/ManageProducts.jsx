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

    componentDidMount() {
        this.getProductData()
    }

    getProductData = () => {
        Axios.get(
            URL_API + 'products/productdata'
        ).then((res) => {
            // console.log(res.data)
            this.setState({productData: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    renderProduct = () => {
        return this.state.productData.map((value) => {
            return(
                <tr key={value.id}>
                    <td>{value.name}</td>
                    <td>{value.desc}</td>
                    <td>Rp {parseInt(value.price).toLocaleString('IN')}</td>
                    <td><img src={URL_API + value.image} alt="product" width="100px"/></td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    onAddClick = () => {
        if(!this.state.productName || !this.state.productDesc || !this.state.productPrice || !this.state.productImage) {
            this.setState({message: 'Please fill all forms..'})
        } else {
            let fd = new FormData()
            fd.append('products', this.state.productImage, this.state.productImage.name)
            fd.append('name', this.state.productName)
            fd.append('desc', this.state.productDesc)
            fd.append('price', this.state.productPrice)
            Axios.post(
                URL_API + 'products/addproduct', fd
            ).then((res) => {
                console.log(res)
                this.setState({
                    message: res.data
                })
                this.getProductData()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    notification = () => {
        if(!this.state.message) {
            return null
        } else {
            if(this.state.message === 'Please fill all forms..') {
                return(
                    <div className="alert-ku alert-danger mb-3 text-center">{this.state.message}</div>
                )
            } else {
                return(
                    <div className="alert-ku alert-success mb-3 text-center">{this.state.message}</div>
                )
            }
        }
    }

    render() {
        if(this.props.role === 'administrator') {
            return(
                <div>
                    <div className="container">
                        <h5 className="mt-3">Add new Product</h5>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><input required type="text" className="form-control" onChange={(e) => {this.setState({productName: e.target.value})}} placeholder="Product Name"/></td>
                                    <td><input required type="text" className="form-control" onChange={(e) => {this.setState({productDesc: e.target.value})}} placeholder="Description"/></td>
                                    <td><input required type="text" className="form-control" onChange={(e) => {this.setState({productPrice: e.target.value})}} placeholder="Price"/></td>
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
                        {this.notification()}

                        <h5>Our Products</h5>
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
                                {this.renderProduct()}
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