import { NotificationItem } from '@pushprotocol/uiweb';
import { useState, useEffect } from "react";
import getUserNotifications from "../../push/get_notifications";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        const loadNotifications = async () => {
            try {
                setLoading(true);
                const feeds = await getUserNotifications('0x458B534Bb7857F5b9A761D71ffA40f41B6c6D51b');
                console.log('notifications: ', feeds);
                setNotifications(feeds);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadNotifications();
    }, []);

    // TODO: Add loader
    return (
        <div>
            {notifications && (
                <div>
                    {notifications.map((notification, i) => {
                        const {
                            cta,
                            title,
                            message,
                            app,
                            icon,
                            image,
                            url,
                        } = notification;

                        return (
                            <NotificationItem
                                key={`notif-${i}`}
                                notificationTitle={title}
                                notificationBody={message}
                                cta={cta}
                                app={app}
                                icon={icon}
                                image={image}
                                url={url}
                            />
                        );
                    })} </div>
            )}
        </div>
    );
}

export default Notifications;