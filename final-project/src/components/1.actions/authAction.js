import Axios from 'axios'

const URL_API = 'http://localhost:8888/'

export const onLoginUser = (EMAIL, PASSWORD) => {
    return(dispatch) => {
        Axios.get(
            URL_API + 'auth/login',
            {
                params: {
                    email: EMAIL,
                    password: PASSWORD
                }
            }
        ).then((res) => {
            // console.log(res.data)
            if(res.data.status === '400') {
                console.log(res.data.message)
            } else if(res.data.status === '200') {
                let {id, email} = res.data.result
                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, email})
                )
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id, email
                    }
                })
            }
        })
    }
}

export const keepLogin = (USER) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: USER.id,
            email: USER.email
        }
    }
}

export const onLogoutUser = () => {
    localStorage.removeItem('userData')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}