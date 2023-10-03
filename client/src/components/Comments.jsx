import { useState } from "react"
import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from 'react-redux'
import { useParams } from "react-router"
import { ListGroup, Form, Button, Stack } from 'react-bootstrap';

function Comments({ comments }) {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        dispatch(commentBlog(params.id, comment))
        setComment('')
    }

    return (
        <div style={{ marginTop: "5%" }}>
            <Stack gap={3}>
                <h2>Comments</h2>
                <Form onSubmit={handleCommentSubmit}>
                    <Form.Group>
                        <Form.Label>leave a comment here</Form.Label>
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control value={comment} onChange={(event) => setComment(event.target.value)} />
                            <Button type="submit">Send</Button>
                        </Stack>
                    </Form.Group>
                </Form>
                <ListGroup>
                    {
                        comments.map(comment => {
                            return (<ListGroup.Item key={comment} as="li">{comment}</ListGroup.Item>)
                        })
                    }
                </ListGroup>
            </Stack>
        </div>
    )
}

export default Comments