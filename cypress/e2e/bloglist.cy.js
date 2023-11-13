import userMock from '../../test/mock/users'
import blogMock from '../../test/mock/blogs'

const mock = { ...userMock, ...blogMock }

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, mock.user)
        cy.visit('')
    })

    it('Login form is shown', function () {
        cy.get('#login-button').should('exist')
        cy.get('#username').should('exist')
        cy.get('#password').should('exist')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type(mock.user.username)
            cy.get('#password').type(mock.user.password)
            cy.get('#login-button').click()

            cy.contains(`${mock.user.name} logged in`).should('exist')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type(mock.userWithWrongCredentials.username)
            cy.get('#password').type(mock.userWithWrongCredentials.password)
            cy.get('#login-button').click()

            const message = cy.contains('error while logging in: username not found')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type(mock.user.username)
            cy.get('#password').type(mock.user.password)
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type(mock.blog.title)
            cy.get('#author').type(mock.blog.author)
            cy.get('#url').type(mock.blog.url)
            cy.contains('Save').click()

            cy.contains(`${mock.blog.title} ${mock.blog.author}`).should('exist')
        })

        it('A blog can be liked', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type(mock.blog.title)
            cy.get('#author').type(mock.blog.author)
            cy.get('#url').type(mock.blog.url)
            cy.contains('Save').click()
            cy.get('a').contains(mock.blog.title).click()
            cy.contains('Like').click()

            cy.contains('1 likes').should('exist')
        })

        it('The user who created a blog can delete it', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type(mock.blog.title)
            cy.get('#author').type(mock.blog.author)
            cy.get('#url').type(mock.blog.url)
            cy.contains('Save').click()
            cy.get('a').contains(mock.blog.title).click()
            cy.contains(`${mock.user.name}`)
            cy.contains('Delete').click()
            cy.contains(new RegExp('^' + mock.blog.title + '$', 'g')).should('not.exist')
        })

        it('Only the creator can see the delete button of a blog', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type(mock.blog.title)
            cy.get('#author').type(mock.blog.author)
            cy.get('#url').type(mock.blog.url)
            cy.contains('Save').click()
            cy.get('a').contains(mock.blog.title).click()
            cy.contains(`${mock.user.name}`).should('exist')
            cy.contains('Delete').should('exist')

            cy.contains(`${mock.user.name} logged in`).click()
            cy.contains('Log out').click()

            cy.request('POST', `${Cypress.env('BACKEND')}/users`, mock.users[1])
            cy.get('#username').type(mock.users[1].username)
            cy.get('#password').type(mock.users[1].password)
            cy.get('#login-button').click()
            cy.contains(`${mock.user.name}`).should('exist')
            cy.contains('Delete').should('not.exist')
            mock.user = mock.users[1]
        })

        afterEach(function () {
            cy.contains(`${mock.user.name} logged in`).click()
            cy.contains('Log out').click()
        })
    })
})