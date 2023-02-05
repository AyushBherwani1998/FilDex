import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import isUserSubscribed from "../../push/get_channels";
import pushLogo from "../../assets/push_logo.svg";

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
            {show && <Button variant="outline-dark" className="mr-4"><div className="mx-4 text-s text-white flex flex-row justify-evenly items-center">
                <img src={pushLogo} alt="" />
                <div className="ml-2">Subscribe</div>
            </div></Button>}
            {!show && <Button variant="outline-dark" className="mr-4"><div className="mx-4 text-s text-white flex flex-row justify-evenly items-center">
                <img src={pushLogo} alt="" />
                <div className="ml-2">Notifications</div>
            </div></Button>}
        </div>
    );
}

export default NotificationButton;