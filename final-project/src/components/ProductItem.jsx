import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles/ProductItem.css'

class ProductItem extends Component {
    render() {
        let {id, name, price} = this.props.product
        let image = `http://localhost:8888/${this.props.product.image}`
        return(
            <div className="card-ku col-6 my-3">
                <img src={image} alt="" className="card-img-top"/>
                <div className="card-body">
                    <p style={{color: "#878787"}} className="card-title">{name}</p>
                    <p className="card-text">Rp {parseInt(price).toLocaleString('IN')}</p>
                    <Link to={`/productdetail/${id}`}>
                        <button className="button-ku">Detail</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProductItem