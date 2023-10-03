import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setError, setSuccess } from "./notificationReducer"

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        all: [],
        byId: null,
    },
    reducers: {
        set: (state, action) => {
            return { ...state, all: action.payload }
        },
        setById: (state, action) => {
            return { ...state, byId: action.payload }
        }
    }
})

const { set, setById } = blogSlice.actions

export const selectBlogs = state => state.blog.all
export const selectBlogById = state => state.blog.byId

export const initializeBlogs = () => {
    return async dispatch => {
        blogService.getAll()
            .then(blogs => {
                dispatch(set(blogs))
            })
            .catch(error => {
                dispatch(setError("error while fetching blogs" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const createBlog = blog => {
    return dispatch => {
        blogService
            .add(blog)
            .then(() => {
                dispatch(initializeBlogs())
                dispatch(setSuccess(`blog "${blog.title}" added`))
            })
            .catch((error) => {
                dispatch(setError("error while creating blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const likeBlog = blog => {
    return dispatch => {
        blogService
            .update(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
            .then(newBlog => {
                dispatch(setById(newBlog))
                dispatch(setSuccess(`blog "${newBlog.title}" liked`))
            })
            .catch((error) => {
                dispatch(setError("error while liking blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const deleteBlog = blog => {
    return dispatch => {
        blogService
            .remove(blog.id)
            .then(() => {
                dispatch(initializeBlogs())
                dispatch(setSuccess(`blog "${blog.title}" deleted`))
            })
            .catch((error) => {
                dispatch(setError("error while removing blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const getBlogById = id => {
    return dispatch => {
        blogService
            .getById(id)
            .then(blog => {
                dispatch(setById(blog))
            })
            .catch((error) => {
                dispatch(setError("error while fetching blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const commentBlog = (id, comment) => {
    return dispatch => {
        blogService
            .comment(id, comment)
            .then(blog => {
                dispatch(setById(blog))
            })
            .catch((error) => {
                dispatch(setError("error while fetching blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export default blogSlice.reducer