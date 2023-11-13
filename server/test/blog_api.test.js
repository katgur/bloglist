const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const mock = require('./mock/blogs')

const api = supertest(app)
const initialBlogs = mock.blogs
const TIMEOUT = 5 * 1000

beforeEach(async () => {
    await Blog.deleteMany({})
}, TIMEOUT)

describe('getting blogs', () => {
    test('blogs are returned as json', async () => {
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()

        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, TIMEOUT)

    test('there are two blogs', async () => {
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        expect(response.body).toHaveLength(2)
    }, TIMEOUT)
})

describe('adding blog', () => {
    test('unique identifier is called id', async () => {
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        expect(response.body[0].id).toBeDefined()
    }, TIMEOUT)

    test('blog is added', async () => {
        const newBlog = initialBlogs[2]

        const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(result._body.title).toBe(newBlog.title)
        expect(result._body.author).toBe(newBlog.author)
        expect(result._body.url).toBe(newBlog.url)
        expect(result._body.likes).toBe(newBlog.likes)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        expect(response.body).toHaveLength(1)
    }, TIMEOUT)

    test('no likes property equals to 0', async () => {
        const noLikesBlog = {
            title: initialBlogs[3].title,
            author: initialBlogs[3].author,
            url: initialBlogs[3].url,
        }

        const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(noLikesBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(result._body.title).toBe(noLikesBlog.title)
        expect(result._body.author).toBe(noLikesBlog.author)
        expect(result._body.url).toBe(noLikesBlog.url)
        expect(result._body.likes).toBe(0)
    }, TIMEOUT)

    test('verifies no title', async () => {
        const noTitleBlog = {
            author: initialBlogs[4].author,
            url: initialBlogs[4].url,
            likes: initialBlogs[4].likes,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(noTitleBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    }, TIMEOUT)

    test('verifies no url', async () => {
        const noUrlBlog = {
            url: initialBlogs[4].url,
            author: initialBlogs[4].author,
            likes: initialBlogs[4].likes,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(noUrlBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    }, TIMEOUT)

    test('cannot add blog with no token provided', async () => {
        const newBlog = initialBlogs[2]

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('deleting blog', () => {
    test('delete works', async () => {
        const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(initialBlogs[0])
            .expect(201)

        const addedBlog = result.body

        await api
            .delete(`/api/blogs/${addedBlog.id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .expect(204)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        expect(response.body).toHaveLength(0)
    }, TIMEOUT)
})

describe('updating blog', () => {
    test('put works', async () => {
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()

        const updatedBlog =
        {
            author: initialBlogs[1].author,
            url: initialBlogs[1].url,
            title: initialBlogs[1].title,
            likes: initialBlogs[1].likes,
        }

        await api
            .put(`/api/blogs/${initialBlogs[0]._id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(updatedBlog)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        const filteredBlog = response.body.filter(i => i.id === initialBlogs[0]._id)[0]
        expect(filteredBlog.author).toBe(updatedBlog.author)
        expect(filteredBlog.url).toBe(updatedBlog.url)
        expect(filteredBlog.title).toBe(updatedBlog.title)
        expect(filteredBlog.likes).toBe(updatedBlog.likes)
    }, TIMEOUT)

    test('put return 404 on non-exiting id', async () => {
        const updatedBlog =
        {
            author: initialBlogs[2].author,
            url: initialBlogs[2].url,
            title: initialBlogs[2].title,
            likes: initialBlogs[2].likes,
        }

        await api
            .put(`/api/blogs/${initialBlogs[2]._id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(updatedBlog)
            .expect(404)
    }, TIMEOUT)
})

afterAll(async () => {
    await mongoose.connection.close()
})
