const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {},
    },
    env: {
        BACKEND: 'http://localhost:3003/api'
    }
})