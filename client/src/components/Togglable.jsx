import { useState, Children, isValidElement, cloneElement } from "react"
import PropTypes from "prop-types"
import { Button, Stack } from "react-bootstrap"

function Togglable({ children, buttonLabel }) {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const childrenWithProps = Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, { toggleVisibility });
        }
    })

    return (
        <div style={{ marginTop: "5%" }}>
            <div style={hideWhenVisible}>
                <Button variant="primary" onClick={toggleVisibility}>{buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                <Stack gap={1}>
                    {childrenWithProps}
                    <Button variant="outline-primary" onClick={toggleVisibility}>Cancel</Button>
                </Stack>
            </div>
        </div>
    )
}

Togglable.displayName = "Togglable"
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable
