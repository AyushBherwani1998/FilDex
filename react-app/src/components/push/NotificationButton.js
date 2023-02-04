import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import isUserSubscribed from "../../push/get_channels";

function NotificationButton() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        isUserSubscribed("0xDC5aFb5DE928bAc740e4bcB1600B93504560d850").then((e) => {
            setShow(!e);
        });
    })

    // TODO: Add onClick
    return (
        <div>
            {show && <Button variant="outline-primary">Subscribe for notifications</Button>}
            {!show && <Button variant="outline-primary">Notifications</Button>}
        </div>
    );
}

export default NotificationButton;