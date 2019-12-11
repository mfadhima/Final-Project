import Axios from 'axios'

const URL_API = 'http://localhost:8888/'

export const quantityCart = (USER) => {
    return(dispatch) => {
        Axios.get(
            URL_API + 'carts/getcart',
            {
                params: {
                    userId: USER.id
                }
            }
        ).then((res) => {
            console.log(res)
            let quantity = res.data.length
            dispatch({
                type: 'SET_CART',
                payload: {
                    quantity
                }
            })
        })
    }
}