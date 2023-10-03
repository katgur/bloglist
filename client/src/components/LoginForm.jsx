import { useState } from "react"
import { Form, Button, Stack } from 'react-bootstrap'

function LoginForm({ handleLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <h2 style={{marginTop: "10%"}}>Login</h2>
            <Form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleLogin(username, password)
                    setUsername("")
                    setPassword("")
                }}
            >
                <Form.Group>
                    <Stack gap={3}>
                        <Form.Label>username
                            <Form.Control
                                id="username"
                                type="text"
                                value={username}
                                name="Username"
                                onChange={({ target }) => setUsername(target.value)}
                            />
                        </Form.Label>
                        <Form.Label>password
                            <Form.Control
                                id="password"
                                type="password"
                                value={password}
                                name="Password"
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </Form.Label>
                        <Button id="login-button" type="submit" size="lg">
                            login
                        </Button>
                    </Stack>
                </Form.Group>
            </Form>
        </>
    )
}

export default LoginForm
