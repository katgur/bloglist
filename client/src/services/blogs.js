import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(baseUrl, config)
    return request.then((response) => response.data)
}

const add = async (data) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.post(baseUrl, data, config)
    return request.then((response) => response.data)
}

const update = async (id, data) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.put(`${baseUrl}/${id}`, data, config)
    return request.then((response) => response.data)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then((response) => response.data)
}

const getById = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(`${baseUrl}/${id}`, config)
    return request.then((response) => response.data)
}

const comment = async (id, comment) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
    return request.then((response) => response.data)
}

export default { getAll, add, setToken, update, remove, getById, comment }
