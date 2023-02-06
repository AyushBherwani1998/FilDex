import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import isUserSubscribed from "../../push/get_channels";
import pushLogo from "../../assets/push_logo.svg";
import requestForChannelOptIn from "../../push/opt_int_channel";
import FilDexConstants from "../../Constants";
import web3 from '../../web3';

function NotificationButton({ userAddress, status, chainId }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        console.log(userAddress);
        isUserSubscribed(userAddress).then((e) => {
            setShow(!e);
        });
    })

    async function channelOptin() {
        if (status === FilDexConstants.notConnected) {
            alert("Please connect your wallet");
        } else {
            if (chainId !== 5) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex(5) }]
                });
                requestForChannelOptIn(userAddress);
            } else {
                requestForChannelOptIn(userAddress);
            }
        }
    }

    // TODO: Add onClick
    return (
        <div>
            {show &&
                <div onClick={() => channelOptin()} className="flex flex-row rounded-full border border-white-500 text-white px-8 py-2 text-md mr-4 hover:bg-hover-fill">
                    <img src={pushLogo} alt="push" />
                    <div className="ml-2">Subscribe</div>
                    <div className="ml-2">

                    </div>
                </div>}


            {!show && <div onClick={() => channelOptin()} className="flex flex-row rounded-full border border-white-500 text-white px-8 py-2 text-md mr-4 hover:bg-hover-fill">
                <img src={pushLogo} alt="push" />
                <div className="ml-2">Notifications</div>
                <div className="ml-2">
                </div>
            </div>}
        </div >
    );
}

export default NotificationButton;