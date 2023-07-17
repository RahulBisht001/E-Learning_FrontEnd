import { server } from '../store'
import axios from 'axios'



export const updateProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({ type: 'updateProfileRequest' })

        const { data } = await axios.patch(`${server}/update-profile`, {
            name, email
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )

        dispatch({ type: 'updateProfileSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'updateProfileFail', payload: errorMessage })
    }
}



export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {

        dispatch({ type: 'changePasswordRequest' })

        const { data } = await axios.put(`${server}/change-password`, {
            oldPassword, newPassword
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )

        dispatch({ type: 'changePasswordSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'changePasswordFail', payload: errorMessage })
    }
}


export const updateProfilePicture = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateProfilePictureRequest' })

        const { data } = await axios.put(`${server}/update-profile-picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        dispatch({ type: 'updateProfilePictureSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'updateProfilePictureFail', payload: errorMessage })
    }
}



export const forgetPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: 'forgetPasswordRequest' })

        const { data } = await axios.post(`${server}/forgot-password`,
            {
                email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )

        dispatch({ type: 'forgetPasswordSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'forgetPasswordFail', payload: errorMessage })
    }
}



export const resetPassword = (token, password) => async (dispatch) => {
    try {

        dispatch({ type: 'resetPasswordRequest' })
        // console.log(token)
        const { data } = token && await axios.put(`${server}/reset-password/${token}`,
            {
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )

        dispatch({ type: 'resetPasswordSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'resetPasswordFail', payload: errorMessage })
    }
}



export const addToPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'addToPlaylistRequest' })

        const { data } = await axios.post(`${server}/add-to-playlist`, { id }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })

        dispatch({ type: 'addToPlaylistSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'addToPlaylistFail', payload: errorMessage })
    }
}



export const removeFromPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'removeFromPlaylistRequest' })

        const { data } = await axios.delete(`${server}/remove-from-playlist?id=${id}`,
            {
                withCredentials: true
            }
        )

        dispatch({ type: 'removeFromPlaylistSuccess', payload: data })

    } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data?.message || err.message;
        dispatch({ type: 'removeFromPlaylistFail', payload: errorMessage })
    }
}