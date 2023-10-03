const config = require("./util/config")
const express = require("express")
require("express-async-errors")
const cors = require("cors")
const blogRouter = require("./controller/blogs")
const userRouter = require("./controller/users")
const authRouter = require("./controller/auth")
const middleware = require("./util/middleware")
const logger = require("./util/logger")
const mongoose = require("mongoose")

const app = express()

mongoose.set("strictQuery", false)

logger.info("Connecting to MongoDB")

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB:", error.message)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", authRouter)

if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controller/test")
    app.use("/api/test", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
