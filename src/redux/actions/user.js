import { server } from "../store";
import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' })

        const { data } = await axios.post(`${server}/login`, { email, password }, {
            headers: {
                "Content-Type": 'application/json',
            },
            withCredentials: true
        })

        // console.log(data)
        dispatch({ type: 'loginSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'loginFail', payload: errorMessage })
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: 'logoutRequest' })
        const { data } = await axios.get(`${server}/logout`, {
            withCredentials: true
        })
        dispatch({ type: 'logoutSuccess', payload: data })
    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'logoutFail', payload: errorMessage })
    }
}


export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'registerRequest' })

        const { data } = await axios.post(`${server}/register`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            },
            withCredentials: true
        })

        console.log(data)
        dispatch({ type: 'registerSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'registerFail', payload: errorMessage })
    }
}


export const getMyProfile = () => async (dispatch) => {
    try {
        dispatch({ type: 'loadUserRequest' })


        const { data } = await axios.get(`${server}/me`,
            { withCredentials: true }
        )

        console.log(data)
        data && dispatch({ type: 'loadUserSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'loadUserFail', payload: errorMessage })
    }
}



export const buySubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'buySubscriptionRequest' })

        const { data } = await axios.get(`${server}/subscribe`, {
            withCredentials: true
        })

        console.log(data)
        dispatch({ type: 'buySubscriptionSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'buySubscriptionFail', payload: errorMessage })
    }
}



export const cancelSubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'cancelSubscriptionRequest' })

        const { data } = await axios.delete(`${server}/subscribe/cancel`, {
            withCredentials: true
        })

        console.log(data)
        dispatch({ type: 'cancelSubscriptionSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'cancelSubscriptionFail', payload: errorMessage })
    }
}
