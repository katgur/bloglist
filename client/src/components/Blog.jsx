import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { selectBlogById, getBlogById, deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from "../reducers/blogReducer"
import Comments from "./Comments"
import { Button, Card } from "react-bootstrap"
import { getUser } from "../reducers/authReducer"

function Blog() {
    const dispatch = useDispatch()
    const params = useParams()
    const blog = useSelector(selectBlogById)
    const navigate = useNavigate()
    const user = useSelector(getUser)

    useEffect(() => {
        dispatch(getBlogById(params.id))
    }, [])

    const onLikeClick = (blog) => {
        dispatch(likeBlog(blog))
        dispatch(getBlogById(params.id))
    }

    const onDeleteClick = (blog) => {
        dispatch(deleteBlog(blog))
        navigate('/')
    }

    return (blog &&
        <>
            <Card style={{ marginTop: "5%", padding: "24px" }}>
                <h1>{blog.title} {blog.author}</h1>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {blog.likes} likes
                    <Button style={{ marginLeft: "5%" }} variant="outline-dark" onClick={() => onLikeClick(blog)}>Like</Button>
                </p>
                <p>
                    added by {blog.user.name}
                    {
                        blog.user.username === user.username &&
                        <Button style={{ marginLeft: "5%" }} variant="danger" onClick={() => onDeleteClick(blog)}>Delete</Button>
                    }
                </p>
            </Card>
            <Comments comments={blog.comments} />
        </>
    )
}

export default Blog