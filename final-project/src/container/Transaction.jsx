import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Classnames from 'classnames';

const URL_API = 'http://localhost:8888/'

class Transaction extends Component {
    state = {
        transactions: [],
        verifiedTransaction: [],
        message: '',
        activeTab: '1'
    }

    toggle = (tab) => {
        if(this.state.activeTab !== tab) this.setState({activeTab: tab})
    }

    componentDidMount() {
        this.getTransaction()
        this.getVerifiedTransaction()
    }

    getTransaction = () => {
        Axios.get(
            URL_API + 'transactions/gettransaction'
        ).then((res) => {
            this.setState({transactions: res.data})
            // console.log(this.state.transactions)
        }).catch((err) => {
            console.log(err)
        })
    }

    getVerifiedTransaction = () => {
        Axios.get(
            URL_API + 'transactions/getverifiedtransaction'
        ).then((res) => {
            this.setState({verifiedTransaction: res.data})
            // console.log(res.data)
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

    onVerifyClick = (val) => {
        if(val.receipt) {
            Axios.put(
                URL_API + `transactions/verifypayment/${val.id}`
            ).then((res) => {
                this.setState({message: res.data})
                this.getTransaction()
                this.getVerifiedTransaction()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onRejectClick = (val) => {
        if(val.receipt) {
            Axios.put(
                URL_API + `transactions/rejectpayment/${val.id}`
            ).then((res) => {
                this.setState({message: res.data})
                this.getTransaction()
                this.getVerifiedTransaction()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    renderTransaction = () => {
        return this.state.transactions.map((val) => {
            let receipt = URL_API + val.receipt
            let verifyButton
            let rejectButton
            if(val.isVerified === 0) {
                verifyButton = <button className="btn btn-outline-info mb-2 text-center">Verify</button>
                rejectButton = <button className="btn btn-outline-danger text-center">Reject</button>
            } else if(val.isVerified === 1) {
                verifyButton = <button className="btn btn-outline-secondary disabled">Verified</button>
            } else if(val.isVerified === 2) {
                rejectButton = <button className="btn btn-outline-secondary disabled">Rejected</button>
            }

            return(
            //     <tr key={val.id}>
            //         <td>#{val.id}</td>
            //         <td>{val.transactionDate}</td>
            //         <td>Rp {val.totalPrice.toLocaleString('IN')}</td>
            //         <td><img src={receipt} alt="" width="300px"/></td>
            //         <td>
            //             <div onClick={() => {this.onVerifyClick(val.id)}}>{verifyButton}</div>
            //             <div onClick={() => {this.onRejectClick(val.id)}}>{rejectButton}</div>
            //         </td>
            //     </tr>
            // )
                <tr key={val.id}>
                    <td>#{val.id}</td>
                    <td>{val.transactionDate}</td>
                    <td>Rp {val.totalPrice.toLocaleString('IN')}</td>
                    <td><img src={receipt} alt="user has not uploaded any receipt yet" width="300px"/></td>
                    <td>
                        <div onClick={() => {this.onVerifyClick(val)}}>{verifyButton}</div>
                        <div onClick={() => {this.onRejectClick(val)}}>{rejectButton}</div>
                    </td>
                </tr>
            )
        })
    }

    renderVerifiedTransaction = () => {
        return this.state.verifiedTransaction.map((val) => {
            let receipt = URL_API + val.receipt
            return(
                <tr key={val.id}>
                    <td>#{val.id}</td>
                    <td>{val.transactionDate}</td>
                    <td>Rp {val.totalPrice.toLocaleString('IN')}</td>
                    <td><img src={receipt} alt="" width="200px"/></td>
                    <td>
                        <button className="btn btn-outline-secondary disabled">Verified</button>
                    </td>
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
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={Classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Pending Transaction
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={Classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Verified Transaction
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
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
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
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
                                                {this.renderVerifiedTransaction()}
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
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