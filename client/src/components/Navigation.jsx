import { getUser, logout } from "../reducers/authReducer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom"

function Navigation() {
    const user = useSelector(getUser)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    if (!user) {
        return null
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Blog app</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/users">users</Link>
                        <Link to='/'>blogs</Link>
                        <NavDropdown title={`${user.name} logged in`} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation