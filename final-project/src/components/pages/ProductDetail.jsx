import React, {Component} from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import '../styles/ProductDetail.css'

const URL_API = 'http://localhost:8888/'

class ProductDetail extends Component {
    state = {
        products: null,
        message: ''
    }

    componentDidMount() {
        this.getProductData()
    }

    getProductData = () => {
        Axios.get(
            URL_API + `products/productdetail/${this.props.match.params.id}`
        ).then((res) => {
            this.setState({products: res.data[0]})
        }).catch((err) => {
            console.log(err)
        })
    }

    onAddToCart = () => {
        let userId = this.props.userId
        let productId = this.state.products.id
        let productName = this.state.products.name
        let productDesc = this.state.products.desc
        let productPrice = this.state.products.price
        let productImage = this.state.products.image
        let quantity = 1

        if(this.props.role !== 'user') {
            this.setState({
                message: 'Please Log in to continue shopping..'
            })
        } else {
            Axios.get(
                URL_API + 'carts/checkcart',
                {
                    params: {
                        userId,
                        productId
                    }
                }
            ).then((res) => {
                if(res.data.length === 0) {
                    Axios.post(
                        URL_API + 'carts/addtocart',
                        {
                            productId,
                            productName,
                            productDesc,
                            productPrice,
                            productImage,
                            userId,
                            quantity
                        }
                    ).then((res2) => {
                        console.log(res2.data)
                        this.setState({message: res2.data})
                    }).catch((err2) => {
                        console.log(err2)
                    })
                } else {
                    let newQuantity = res.data[0].quantity + 1
    
                    Axios.put(
                        URL_API + `carts/addsameproduct/${res.data[0].id}`,
                        {
                            quantity: newQuantity
                        }
                    ).then((res3) => {
                        console.log(res3.data)
                        this.setState({message: res3.data})
                    }).catch((err3) => {
                        console.log(err3)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    notification = () => {
        if(!this.state.message) {
            return null
        } else {
            if(this.state.message === 'Please Log in to continue shopping..') {
                setTimeout(() => {
                    this.setState({message: ''})
                }, 3000);
                return(
                    <div className="alert-ku alert-danger text-center">{this.state.message}</div>
                )
            } else {
                setTimeout(() => {
                    this.setState({message: ''})
                }, 3000);
                return(
                    <div className="alert-ku alert-success text-center">{this.state.message}</div>
                )
            }
        }
    }

    render() {
        if(this.state.products) {
            let price = this.state.products.price
            let image = `http://localhost:8888/${this.state.products.image}`
            return (
                // <div className='card col-5 my-5 mx-auto'>
                //     <div className='card-header mt-2'>
                //         <h2>{this.state.products.name}</h2>
                //     </div>
                //     <div className='card-body'>
                //         <img className='card-img-top' alt="" src={image} />
                //         <h3>Name: {this.state.products.name}</h3>
                //         <p>Description : {this.state.products.desc}</p>
                //         <p>Harga : Rp {parseInt(price).toLocaleString('IN')}</p>
                //     </div>
                //     <button className="button-ku mb-3">Add To Cart</button>
                // </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-6"><img className='card-img-top' alt="" src={image} /></div>
                        <div className="col-6">
                            <h2>{this.state.products.name}</h2>
                            <h5>Description:</h5>
                            <p>{this.state.products.desc}</p>
                            <p style={{fontWeight: "bold"}}>Price : Rp {parseInt(price).toLocaleString('IN')}</p>
                            <button onClick={this.onAddToCart} className="button-ku mb-3">Add To Cart</button>
                            {this.notification()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(ProductDetail)