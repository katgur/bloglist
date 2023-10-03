import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
        user: authReducer,
        users: userReducer,
    },
    middleware: [thunk, logger],
})

export default store