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
            {show && 
                        <div className="flex flex-row rounded-full border border-white-500 text-white px-8 py-2 text-md mr-4 hover:bg-hover-fill">
                        <img src={pushLogo} alt="metamask" />
                        <div className="ml-2">Subscribe</div>
                        <div className="ml-2">
                        
                        </div>
                    </div>}
            
           
            {!show && <Button variant="outline-dark hover:bg-hover-fill" className="mr-4"><div className="mx-4 text-s text-white flex flex-row justify-evenly items-center ">
                <img src={pushLogo} alt="" />
                <div className="ml-2">Notifications</div>
            </div></Button>}
        </div>
    );
}

export default NotificationButton;