import * as PushAPI from "@pushprotocol/restapi";
import { channelAddress } from "./constants";

async function isUserSubscribed(userAddress) {
    const subscriptions = await PushAPI.user.getSubscriptions({
        user: `eip155:5:${userAddress}`,
        env: 'staging'
    });

    return subscriptions.filter(filtersubscriptions).length > 0;

}

function filtersubscriptions(subscription) {
    return subscription.channel === channelAddress;
}

export default isUserSubscribed;