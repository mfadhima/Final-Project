import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'

import '../styles/ManageProducts.css'

const URL_API = 'http://localhost:8888/'

class ManageProducts extends Component {
    state = {
        productName: '',
        productDesc: '',
        productPrice: 0,
        productImage: null,
        productData: [],
        message: '',
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: 0,
        selectedImage: null
    }

    componentDidMount() {
        this.getProductData()
    }

    getProductData = () => {
        Axios.get(
            URL_API + 'products/productdata'
        ).then((res) => {
            // console.log(res.data)
            this.setState({
                productData: res.data,
                selectedId: 0
            })
        }).catch((err) => {
            console.log(err)
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
                // console.log(res)
                this.setState({
                    message: res.data
                })
                this.getProductData()
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    
    onEditClick = (product) => {
        this.setState({
            selectedId: product.id,
            selectedName: product.name,
            selectedDesc: product.desc,
            selectedPrice: product.price,
            selectedImage: product.image
        })
    }

    onSaveClick = (productId) => {
        Axios.put(
            URL_API + `products/editproduct/${productId}`,
            {
                name: this.state.selectedName,
                desc: this.state.selectedDesc,
                price: this.state.selectedPrice
            }
        ).then((res2) => {
            this.getProductData()
            let fd = new FormData()
            fd.append('products', this.state.selectedImage, this.state.selectedImage.name)
            fd.append('name', this.state.selectedName)
            fd.append('desc', this.state.selectedDesc)
            fd.append('price', this.state.selectedPrice)
            Axios.put(
                URL_API + `products/editproductphoto/${productId}`, fd
            ).then((res) => {
                console.log(res.data)
                this.getProductData()
                
            }).catch((err) => {
                console.log(err)
            })
            // console.log(res2.data)
            // this.getProductData()
        }).catch((err2) => {
            console.log(err2)
        })
        
    }

    onDeleteClick = (id) => {
        // console.log(id)
        Axios.delete(
            URL_API + `products/deleteproduct/${id}`
        ).then((res) => {
            this.getProductData()
        }).catch((err) => {
            console.log(err)
        })
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

    renderProduct = () => {
        return this.state.productData.map((value) => {
            if(this.state.selectedId !== value.id) {
                return(
                    <tr key={value.id}>
                        <td>{value.name}</td>
                        <td>{value.desc}</td>
                        <td>Rp {parseInt(value.price).toLocaleString('IN')}</td>
                        <td><img src={URL_API + value.image} alt="product" width="100px"/></td>
                        <td>
                            <button className="button-ku mb-1" onClick={()=>{this.onEditClick(value)}}>Edit</button>
                            <button className="button-ku-delete btn-block" onClick={()=>{this.onDeleteClick(value.id)}}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr key={value.id}>
                        <td><input type="text" className="form-control" onChange={(e) => {this.setState({selectedName: e.target.value})}} value={this.state.selectedName}/></td>
                        <td><input type="text" className="form-control" onChange={(e) => {this.setState({selectedDesc: e.target.value})}} value={this.state.selectedDesc}/></td>
                        <td><input type="text" className="form-control" onChange={(e) => {this.setState({selectedPrice: e.target.value})}} value={this.state.selectedPrice}/></td>
                        <td>
                            <input
                                type="file"
                                accept="image/*"
                                ref="uploadImage"
                                hidden
                                onChange={(e) => {this.setState({selectedImage: e.target.files[0]})}}
                            />
                            <input
                                type="button"
                                value="Choose an image"
                                className="button-ku"
                                onClick={() => {this.refs.uploadImage.click()}}
                            />
                        </td>
                        <td>
                            <button className="button-ku mb-1" onClick={() => {this.onSaveClick(value.id)}}>Save</button>
                            <button className="button-ku-delete btn-block" onClick={() => {this.setState({selectedId: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
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
                                    <th className="col-2">Product Name</th>
                                    <th className="col-4">Description</th>
                                    <th className="col-2">Price</th>
                                    <th className="col-1">Image</th>
                                    <th className="col-2">Action</th>
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