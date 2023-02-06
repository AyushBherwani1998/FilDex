import { useMetaMask } from "metamask-react";
const { default: Notifications } = require("../components/push/Notifications");

function NotificationsPage() {
    const { account } = useMetaMask();

    return (
        <div className='flex flex-row justify-center'>
            <Notifications userAddress={account} />
        </div>
    );
}

export default NotificationsPage;