import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const getByCount = () => {
    const request = axios.get(`${baseUrl}/by_count`)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getByCount, getById }