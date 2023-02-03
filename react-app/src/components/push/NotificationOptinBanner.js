import { Alert, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import isUserSubscribed from "../../push/get_channels";

function OptinBanner() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        isUserSubscribed("0xDC5aFb5DE928bAc740e4bcB1600B93504560d850").then((e) => {
            setShow(!e);
        });
    })

    // TODO: Add banner code
    return (
        <div />
    );
}

export default OptinBanner;