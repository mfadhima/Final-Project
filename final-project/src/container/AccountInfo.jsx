import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import '../styles/AccountInfo.css'

const URL_API = 'http://localhost:8888/'

class AccountInfo extends Component {
    state = {
        transactions: [],
        receipt: null,
        message: ''
    }

    componentDidMount() {
        this.getTransactionUser()
    }

    getTransactionUser = () => {
        Axios.get(
            URL_API + 'transactions/getuserorder',
            {
                params: {
                    userId: this.props.userId
                }
            }
        ).then((res) => {
            this.setState({transactions: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    onSaveClick = (id) => {
        let fd = new FormData()
        fd.append('receipt', this.state.receipt, this.state.receipt.name)
        Axios.put(
            URL_API + `transactions/uploadreceipt/${id}`, fd
        ).then((res) => {
            this.setState({message: res.data})
            this.getTransactionUser()
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

    renderTransactionUser = () => {
        return this.state.transactions.map((val) => {
            let totalPrice = val.totalPrice
            let paymentStatus
            if(val.isVerified === 0 && !val.receipt) {
                paymentStatus = 'Pending'
            } else if(val.isVerified === 0 && val.receipt) {
                paymentStatus = 'Receipt Uploaded'
            } else if(val.isVerified === 2) {
                paymentStatus = 'Rejected'
            } else {
                paymentStatus = 'Accepted'
            }
            let uploadReceipt
            if(val.isVerified === 0 || val.isVerified === 2) {
                uploadReceipt = <td>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref="uploadReceipt"
                                        hidden
                                        onChange={(e) => {this.setState({receipt: e.target.files[0]})}}
                                    />
                                    <input
                                        type="button"
                                        value="Upload Receipt"
                                        className="button-ku"
                                        onClick={() => {this.refs.uploadReceipt.click()}}
                                    />
                                    <button onClick={() => {this.onSaveClick(val.id)}} className="button-ku-save btn-block">Save</button>
                                </td>
            } else {
                uploadReceipt = <td></td>
            }
            return(
                <tr key={val.id}>
                    <td>#{val.id}</td>
                    <td>{val.transactionDate}</td>
                    <td>Rp {totalPrice.toLocaleString('IN')}</td>
                    <td>{paymentStatus}</td>
                    {uploadReceipt}
                </tr>
            )
        })
    }

    render() {
        if(this.props.role === 'user') {
            return (
                <div>
                    <div className="container">
                        <h3 className="mt-5">{this.props.firstName} {this.props.lastName}</h3> <hr/>
                        <h5>Transaction History</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Payment Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransactionUser()}
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
        userEmail: state.auth.email,
        userId: state.auth.id,
        role: state.auth.role,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName
    }
}

export default connect(mapStateToProps)(AccountInfo)