import React, { Component } from 'react'
import '../styles/Cart.css'
import Axios from 'axios'

const URL_API = 'http://localhost:8888/'

class Checkout extends Component {
    state = {
        message: ''
    }

    onCompleteOrder = () => {
        let total = 0
        let carts = this.props.carts
        for(let i = 0; i < carts.length; i++) {
            total += (carts[i].quantity * carts[i].productPrice)
        }

        Axios.post(
            URL_API + 'transactions/completetransaction',
            {
                totalPrice: total,
                userId: this.props.userId
            }
        ).then((res) => {
            // console.log(res.data)
            this.setState({message: res.data})
            // CLEAN USER'S CART
            Axios.delete(
                URL_API + `carts/deletefullcart/${this.props.userId}`
            ).then((res2) => {
                console.log(res2)
            }).catch((err2) => {
                console.log(err2)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    notification = () => {
        if(!this.state.message) {
            return null
        } else {
            return(
                <div className="alert-ku alert-success text-center">{this.state.message}</div>
            )
        }
    }

    renderCheckout = () => {
        return this.props.carts.map((val) => {
            return(
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.productName}</td>
                    <td>{val.productPrice}</td>
                    <td>{val.quantity}</td>
                    <td>{val.productPrice * val.quantity}</td>
                </tr>
            )
        })
    }

    renderTotalPrice = () => {
        let total = 0
        let carts = this.props.carts

        for(let i = 0; i < carts.length; i++) {
            total += (carts[i].quantity * carts[i].productPrice)
        }

        return(
            <tr>
                <th colSpan="4">Total</th>
                <td>Rp {total.toLocaleString('IN')}</td>
            </tr>
        )
    }

    render() {
        if(this.props.carts) {
            return (
                <div>
                    <div className="container">
                        <h4 className="mt-5">Checkout</h4>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCheckout()}
                                {this.renderTotalPrice()}
                            </tbody>
                        </table>
                        <button onClick={this.onCompleteOrder} className="button-ku-checkout btn-block">Complete Order</button>
                        {this.notification()}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}

export default Checkout