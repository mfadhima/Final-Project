import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component {
    render() {
        return(
            <div className="container">
               <div className="d-flex footer-ku">
                   <div className="col-6 pt-2">bagian 1</div>
                   <div className="col-3 pt-2">bagian 2</div>
                   <div className="col-3 pt-2">bagian 3</div>
               </div> 
            </div>
        )
    }
}

export default Footer