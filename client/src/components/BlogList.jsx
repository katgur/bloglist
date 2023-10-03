import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectBlogs, initializeBlogs } from "../reducers/blogReducer"
import { Link } from "react-router-dom"
import { Row, Col } from 'react-bootstrap'

function BlogList() {
    const blogs = useSelector(selectBlogs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    return (blogs &&
        <div style={{ marginTop: "5%" }}>
                {
                    blogs.map(blog => {
                        return <Row key={blog.id}><Col><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Col> <Col>{blog.author}</Col></Row>
                    })
                }
        </div>
    )
}

export default BlogList