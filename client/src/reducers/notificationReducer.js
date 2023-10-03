import { createSlice } from '@reduxjs/toolkit'

export const MESSAGE_TYPE_SUCCESS = "success"
export const MESSAGE_TYPE_ERROR = "danger"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        set: (state, action) => {
            return action.payload
        },
        reset: (state, action) => {
            return null
        }
    }
})

const { set, reset } = notificationSlice.actions

export const getNotification = state => state.notification

export const setError = (content) => {
    return dispatch => {
        dispatch(set({ type: MESSAGE_TYPE_ERROR, content: content }))
        setTimeout(() => {
            dispatch(reset())
        }, 5 * 1000)
    }
}

export const setSuccess = (content) => {
    return dispatch => {
        dispatch(set({ type: MESSAGE_TYPE_SUCCESS, content: content }))
        setTimeout(() => {
            dispatch(reset())
        }, 5 * 1000)
    }
}

export default notificationSlice.reducer