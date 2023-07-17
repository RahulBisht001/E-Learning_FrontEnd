import axios from 'axios'
import { server } from '../store'


export const contactUs = (name, email, message) => async (dispatch) => {
    try {
        dispatch({
            type: "contactRequest"
        })

        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${server}/contact`,
            { name, email, message }, config)

        dispatch({
            type: "contactSuccess",
            payload: data
        })

    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'contactFailure', payload: errorMessage })
    }
}


export const courseRequest = (name, email, course) => async (dispatch) => {
    try {
        dispatch({
            type: "courseRequest"
        })

        const config = {
            headers: {
                "Content-type": "application/json"
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${server}/course-request`,
            { name, email, course }, config)
        dispatch({
            type: "courseSuccess",
            payload: data
        })
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'courseFailure', payload: errorMessage })
    }
}