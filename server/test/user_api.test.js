const User = require('../model/user')
const mock = require('./mock/users')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)
const TIMEOUT = 5 * 1000

describe('invalid user is not added', () => {
    test('username is required', async () => {
        const noUsernameUser = mock.noUsernameUser

        await api
            .post('/api/users')
            .send(noUsernameUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    }, TIMEOUT)

    test('password is required', async () => {
        const noPasswordUser = mock.noPasswordUser

        await api
            .post('/api/users')
            .send(noPasswordUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    }, TIMEOUT)

    test('username is at least 3 characters long', async () => {
        const shortUsernameUser = mock.shortUsernameUser

        await api
            .post('/api/users')
            .send(shortUsernameUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    }, TIMEOUT)

    test('password is at least 3 characters long', async () => {
        const shortPasswordUser = mock.shortPasswordUser

        await api
            .post('/api/users')
            .send(shortPasswordUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    }, TIMEOUT)

    test('username must be unique', async () => {
        const user = mock.registerUser

        await api
            .post('/api/users')
            .send(user)
            .expect(201)

        const response1 = await api.get('/api/users')
        expect(response1.body).toHaveLength(2)

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response2 = await api.get('/api/users')
        expect(response2.body).toHaveLength(2)

        User.deleteOne({ username: user.username })
    }, TIMEOUT)
})

afterAll(async () => {
    await mongoose.connection.close()
})
