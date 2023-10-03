import { useSelector } from "react-redux"
import { getNotification } from "../reducers/notificationReducer"
import { Alert } from "react-bootstrap"

function Notification() {
    const notification = useSelector(getNotification)

    return (notification &&
        <Alert style={{marginTop: "5%"}} variant={notification.type}>
            {notification.content}
        </Alert>
    )
}

export default Notification