const noUsernameUser = {
    name: 'No Username',
    password: 'no username'
}

const noPasswordUser = {
    name: 'No Password',
    username: 'nopassword'
}

const registerUser = {
    username: 'newuser',
    password: 'newuser'
}

const shortUsernameUser = {
    username: 'sh',
    name: 'Short Username',
    password: 'shortusername'
}

const shortPasswordUser = {
    username: 'shortpassword',
    name: 'Short Password',
    password: 'sh'
}

const users = [
    {
        name: 'Admin',
        username: 'admin',
        password: 'admin'
    },
    {
        name: 'Kate',
        username: 'root',
        password: '12345'
    },
]

const userWithWrongCredentials = {
    name: 'Kate',
    username: 'wrong',
    password: 'credentials'
}

module.exports = { users, noUsernameUser, noPasswordUser, registerUser, shortUsernameUser, shortPasswordUser, userWithWrongCredentials, user: users[0] }