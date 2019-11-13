import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'

const URL_API = 'http://localhost:8888/'

class Transaction extends Component {
    state = {
        transactions: [],
        message: ''
    }

    componentDidMount() {
        this.getTransaction()
    }

    getTransaction = () => {
        Axios.get(
            URL_API + 'transactions/gettransaction'
        ).then((res) => {
            this.setState({transactions: res.data})
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

    onVerifyClick = (id) => {
        Axios.put(
            URL_API + `transactions/verifypayment/${id}`
        ).then((res) => {
            this.setState({message: res.data})
            this.getTransaction()
        }).catch((err) => {
            console.log(err)
        })
    }

    renderTransaction = () => {
        return this.state.transactions.map((val) => {
            let receipt = URL_API + val.receipt
            let verifyButton
            if(val.isVerified === 0) {
                verifyButton = <button className="btn btn-outline-info">Verify</button>
            } else {
                verifyButton = <button className="btn btn-outline-secondary disabled">Verified</button>
            }
            return(
                <tr key={val.id}>
                    <td>#{val.id}</td>
                    <td>{val.transactionDate}</td>
                    <td>Rp {val.totalPrice.toLocaleString('IN')}</td>
                    <td><img src={receipt} alt="" width="300px"/></td>
                    <td><div onClick={() => {this.onVerifyClick(val.id)}}>{verifyButton}</div></td>
                </tr>
            )
        })
    }

    render() {
        if(this.props.role === 'administrator') {
            return(
                <div>
                    <div className="container">
                        <h2 className="mt-5">Transaction</h2> <hr/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Payment Receipt</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransaction()}
                            </tbody>
                        </table>
                        {this.notification()}
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

export default connect(mapStateToProps)(Transaction)