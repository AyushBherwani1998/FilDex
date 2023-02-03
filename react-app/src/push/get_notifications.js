import * as PushAPI from "@pushprotocol/restapi";

async function getUserNotifications(reciepient) {
    let notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:${reciepient}`,
        env: 'staging'
    });

    return notifications;
}

export default getUserNotifications;