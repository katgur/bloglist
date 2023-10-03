const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../model/user")
const { usersByCount } = require('../util/list_helper')

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body

    if (!password) {
        response.status(400).json({ error: "password is required" })
        return
    }

    if (password.length < 3) {
        response
            .status(400)
            .json({ error: "password must be longer than 3 characters long" })
        return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    const result = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
    })
    response.json(result)
})

usersRouter.get("/by_count", async (request, response) => {
    const result = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
    })
    response.json(usersByCount(result))
})

usersRouter.get("/:id", async (request, response) => {
    const result = await User.findById(request.params.id).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
    })
    response.json(result)
})

module.exports = usersRouter
