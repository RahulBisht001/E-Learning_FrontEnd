import { server } from '../store'
import axios from 'axios'

export const createCourse = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createCourseRequest' })

        const { data } = await axios.post(`${server}/create-course`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })

        console.log("------Data")
        console.log(data)
        dispatch({ type: 'createCourseSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'createCourseFail', payload: errorMessage })
    }
}


export const deleteCourse = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteCourseRequest' })

        const { data } = await axios.delete(`${server}/course/${id}`, {
            withCredentials: true
        })
        dispatch({ type: 'deleteCourseSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'deleteCourseFail', payload: errorMessage })
    }
}


export const addLecture = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: 'addLectureRequest' })

        const { data } = await axios.post(`${server}/course/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/from-data'
            },
            withCredentials: true
        })

        console.log("------Data")
        console.log(data)
        dispatch({ type: 'addLectureSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'addLectureFail', payload: errorMessage })
    }
}


export const deleteLecture = (courseId, lectureId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteLectureRequest' })

        const { data } = await axios
            .delete(`${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`, {
                withCredentials: true
            })

        console.log("------Data")
        console.log(data)
        dispatch({ type: 'deleteLectureSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'deleteLectureFail', payload: errorMessage })
    }
}


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllUsersRequest' })

        const { data } = await axios.get(`${server}/admin/users`, {
            withCredentials: true
        })

        console.log("------Data")
        console.log(data.allUsers)
        dispatch({ type: 'getAllUsersSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'getAllUsersFail', payload: errorMessage })
    }
}


export const updateUserRole = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'updateUserRoleRequest' })

        const { data } = await axios.put(`${server}/admin/user/${id}`, {}, {
            withCredentials: true
        })

        dispatch({ type: 'updateUserRoleSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'updateUserRoleFail', payload: errorMessage })
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteUserRequest' })

        const { data } = await axios.delete(`${server}/admin/user/${id}`, {
            withCredentials: true
        })
        dispatch({ type: 'deleteUserSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'deleteUserFail', payload: errorMessage })
    }
}


export const getDashboardStats = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'getAdminStatsRequest' })

        const { data } = await axios.get(`${server}/admin/stats`, {
            withCredentials: true
        })
        dispatch({ type: 'getAdminStatsSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'getAdminStatsFail', payload: errorMessage })
    }
}

