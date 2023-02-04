import * as PushAPI from "@pushprotocol/restapi";
import { channelAddress } from "./constants";
import * as ethers from "ethers";


async function requestForChannelOptIn(userAddress) {
    const _ = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await PushAPI.channels.subscribe({
        signer: provider.getSigner(),
        channelAddress: `eip155:5:${channelAddress}`,
        userAddress: `eip155:5:${userAddress}`,
        onSuccess: () => {
            console.log('Opt in success');
        },
        onError: (e) => {
            console.error(`opt in error ${e}`);
            alert("Failed to subcribe for notifications");
        },
        env: 'staging'
    });
}
export default requestForChannelOptIn;