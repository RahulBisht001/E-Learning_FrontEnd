import { server } from '../store'
import axios from 'axios'



export const getAllCourses = (category = "", keyword = "") => async (dispatch) => {
    try {
        dispatch({ type: 'allCourseRequest' })

        const { data } = await axios
            .get(`${server}/courses?keyword=${keyword}&category=${category}`)

        console.log("------Data")
        console.log(data)
        dispatch({ type: 'allCourseSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'allCourseFail', payload: errorMessage })
    }
}


export const getCourseLectures = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'getCourseRequest' })

        const { data } = await axios
            .get(`${server}/course/${id}`, {
                withCredentials: true
            })

        dispatch({ type: 'getCourseSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'getCourseFail', payload: errorMessage })
    }
}




