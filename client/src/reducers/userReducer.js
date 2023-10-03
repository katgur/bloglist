import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        byCount: [],
        byId: null,
    },
    reducers: {
        setByCount: (state, action) => {
            return { ...state, byCount: action.payload }
        },
        setById: (state, action) => {
            return { ...state, byId: action.payload }
        }
    }
})

const { setByCount, setById } = userSlice.actions

export const selectUsersByCount = state => state.users.byCount
export const selectUserById = state => state.users.byId

export const getUsersByCount = () => {
    return async dispatch => {
        const users = await userService.getByCount()
        dispatch(setByCount(users))
    }
}

export const getUserById = (id) => {
    return async dispatch => {
        const user = await userService.getById(id)
        dispatch(setById(user))
    }
}

export default userSlice.reducer