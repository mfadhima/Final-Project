import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import '../styles/Cart.css'
import Axios from 'axios'

import Checkout from '../components/Checkout'

const URL_API = 'http://localhost:8888/'

class Cart extends Component {
    state = {
        carts: [],
        checkouts: null,
        selectedId: 0,
        selectedQty: 0
    }

    componentDidMount() {
        this.getCartData()
    }

    getCartData = () => {
        Axios.get(
            URL_API + 'carts/getcart',
            {
                params: {
                    userId: this.props.userId
                }
            }
        ).then((res) => {
            this.setState({
                carts: res.data,
                selectedId: 0
            })
            // console.log(this.state.carts)
        }).catch((err) => {
            console.log(err)
        })
    }

    onEditClick = (val) => {
        this.setState({
            selectedId: val.id,
            selectedQty: val.quantity
        })
    }

    onDeleteClick = (id) => {
        Axios.delete(
            URL_API + `carts/deletecart/${id}`
        ).then((res) => {
            this.getCartData()
            console.log(res.data)
        })
    }
    
    onSaveClick = (id) => {
        Axios.put(
            URL_API + `carts/addsameproduct/${id}`,
            {
                quantity: this.state.selectedQty
            }
        ).then((res) => {
            console.log(res.data)
            this.getCartData()
        }).catch((err) => {
            console.log(err)
        })
    }

    onCheckoutClick = () => {
        this.setState({checkouts: this.state.carts})
        // console.log(this.state.checkouts)
    }

    renderCheckoutButton = () => {
        if(this.state.carts.length === 0) {
            return null
        } else {
            return(
                <div className="text-center">
                    <button onClick={this.onCheckoutClick} className="button-ku-checkout btn-block">Checkout</button>
                </div>
            )
        }
    }

    renderCart = () => {
        return this.state.carts.map((val) => {
            let image = URL_API + val.productImage
            let productPrice = val.productPrice
            if(this.state.selectedId !== val.id) {
                return (
                    <tr key={val.id}>
                        <td>
                            <img src={image} alt="" width="200px"/>
                        </td>
                        <td>{val.productName}</td>
                        <td>Rp {productPrice.toLocaleString('IN')}</td>
                        <td>{val.quantity}</td>
                        <td>
                            <button onClick={() => {this.onEditClick(val)}} className="button-ku mb-1">Edit Qty</button>
                            <button onClick={() => {this.onDeleteClick(val.id)}} className="button-ku-delete btn-block">Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={val.id}>
                        <td>
                            <img src={image} alt="" width="200px"/>
                        </td>
                        <td>{val.productName}</td>
                        <td>Rp {productPrice.toLocaleString('IN')}</td>
                        <td><input type="number" min="1" className="form-control" onChange={(e) => {this.setState({selectedQty: e.target.value})}} value={this.state.selectedQty}/></td>
                        <td>
                            <button onClick={() => {this.onSaveClick(val.id)}} className="button-ku mb-1">Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className="button-ku-delete btn-block">Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        if(this.props.role === 'user') {
            return(
                <div>
                    <div className="container">
                        <h4 className="mt-5">Shopping Cart</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>

                        {this.renderCheckoutButton()}

                        <Checkout carts={this.state.checkouts} userId={this.props.userId} />
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(Cart)