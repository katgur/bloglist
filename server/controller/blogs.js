const blogRouter = require("express").Router()
const Blog = require("../model/blog")
const jwt = require("jsonwebtoken")

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1
    })
    response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" })
    }

    const user = request.user
    if (!user) {
        return response.status(404).json({ error: "user not found" })
    }

    const { title, author, url, likes } = request.body
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes ? likes : 0,
        user: user.id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete("/:id", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" })
    }

    const user = request.user
    if (!user) {
        return response.status(404).json({ error: "user not found" })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: "blog not found" })
    }
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(403).json({ error: "no access to the resource" })
    }
})

blogRouter.put("/:id", async (request, response) => {
    const blog = { ...request.body }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: "query"
    })
    if (result) {
        response.json(result)
    } else {
        response.status(404).end()
    }
})

blogRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate("user", {
        username: 1,
        name: 1
    })
    response.json(blog)
})

blogRouter.post("/:id/comments", async (request, response) => {
    const { comment } = request.body
    const blog = await Blog.findById(request.params.id).lean()
    const newBlog = { ...blog, comments: [...blog.comments, comment] }
    const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
        new: true,
        runValidators: true,
        context: "query"
    })
    response.status(201).json(result)
})

module.exports = blogRouter
