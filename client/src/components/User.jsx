import { useDispatch, useSelector } from "react-redux"
import { getUserById, selectUserById } from "../reducers/userReducer"
import { useEffect } from "react"
import { useParams } from 'react-router'
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

function User() {
    const user = useSelector(selectUserById)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getUserById(params.id))
    }, [])

    return (user &&
        <>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ListGroup>
                {
                    user.blogs.map(blog => {
                        return <ListGroup.Item as='li' key={blog.title}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
                    })
                }
            </ListGroup>
        </>
    )
}

export default User