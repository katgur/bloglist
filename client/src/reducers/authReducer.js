import { createSlice } from "@reduxjs/toolkit"
import authService from '../services/auth'
import { setError, setSuccess } from "./notificationReducer"

const USER_KEY = "loggedBlogappUser"

const authSlice = createSlice({
    name: 'auth',
    initialState: JSON.parse(window.localStorage.getItem(USER_KEY)),
    reducers: {
        set: (state, action) => {
            return action.payload
        },
        reset: (state, action) => {
            return null
        }
    }
})

const { set, reset } = authSlice.actions

export const getUser = state => state.user

export const login = (username, password) => {
    return dispatch => {
        authService
            .login(username, password)
            .then((data) => {
                dispatch(set(data))
                window.localStorage.setItem(USER_KEY, JSON.stringify(data))
                dispatch(setSuccess("you have successfully logged in"))
            })
            .catch((error) => {
                dispatch(setError("error while logging in" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem(USER_KEY)
        dispatch(reset())
    }
}

export default authSlice.reducer