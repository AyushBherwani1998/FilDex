import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { channelAddress } from "./constants";


const PK = process.env.REACT_APP_PRIVATE_KEY;
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

async function sendNotification(title, body, recipient, cta = '') {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3,
            identityType: 2,
            notification: {
                title: title,
                body: body
            },
            payload: {
                title: title,
                body: body,
                img: '',
                cta: cta,
            },
            recipients: `eip155:5:${recipient}`,
            channel: `eip155:5:${channelAddress}`,
            env: 'staging'
        });
        console.log('API repsonse: ', apiResponse);
    } catch (err) {
        console.error('Error: ', err);
    }
}

export default sendNotification;