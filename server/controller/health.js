const healthRouter = require('express').Router()

healthRouter.post('/health', async (request, response) => {
    response.send('ok')
})

module.exports = healthRouter
