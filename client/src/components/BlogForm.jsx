import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { Form, Button, Stack } from 'react-bootstrap'

function BlogForm({ toggleVisibility }) {
    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: ""
    })
    const dispatch = useDispatch()

    const onSubmit = (event) => {
        event.preventDefault()
        toggleVisibility()
        dispatch(createBlog(blog))
        setBlog({
            title: "",
            author: "",
            url: ""
        })
    }

    return (
        <>
            <h2>create new blog</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Stack>
                        <Form.Label>title
                            <Form.Control
                                id="title"
                                type="text"
                                value={blog.title}
                                name="title"
                                onChange={({ target }) =>
                                    setBlog({ ...blog, title: target.value })
                                }
                            />
                        </Form.Label>
                        <Form.Label>author
                            <Form.Control
                                id="author"
                                type="text"
                                value={blog.author}
                                name="author"
                                onChange={({ target }) =>
                                    setBlog({ ...blog, author: target.value })
                                }
                            />
                        </Form.Label>
                        <Form.Label>url
                            <Form.Control
                                id="url"
                                type="text"
                                value={blog.url}
                                name="url"
                                onChange={({ target }) =>
                                    setBlog({ ...blog, url: target.value })
                                }
                            />
                        </Form.Label>
                        <Button type="submit">Save</Button>
                    </Stack>
                </Form.Group>
            </Form>
        </>
    )
}

export default BlogForm
