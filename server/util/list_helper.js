const lodash = require("lodash")

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let max = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > max.likes) {
            max = blog
        }
    })
    return { title: max.title, author: max.author, likes: max.likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const groupedByAuthor = lodash.groupBy(blogs, "author")
    const mappedAuthorToBlogs = lodash.map(groupedByAuthor, authorToBlog)
    return lodash.maxBy(mappedAuthorToBlogs, "blogs")
    function authorToBlog(entry) {
        return {
            author: entry[0].author,
            blogs: entry.length
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const groupedByAuthor = lodash.groupBy(blogs, "author")
    const summedByLikes = lodash.map(groupedByAuthor, authorToLikes)
    return lodash.maxBy(summedByLikes, "likes")
    function authorToLikes(entry) {
        return {
            author: entry[0].author,
            likes: lodash.sumBy(entry, "likes")
        }
    }
}

const usersByCount = (users) => {
    function userToBlogs(entry) {
        return {
            user: { name: entry.name, username: entry.username, id: entry.id },
            blogCount: entry.blogs.length
        }
    }
    return lodash.map(users, userToBlogs)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersByCount
}
