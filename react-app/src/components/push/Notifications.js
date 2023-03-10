import { NotificationItem } from '@pushprotocol/uiweb'
import { useState, useEffect } from 'react'
import getUserNotifications from '../../push/get_notifications'
import Spinner from 'react-bootstrap/Spinner';


function Notifications ({ userAddress }) {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true)
        const feeds = await getUserNotifications(userAddress)
        console.log('notifications: ', feeds)
        setNotifications(feeds)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadNotifications()
  }, [])

  // TODO: Add loader
  return (
    <div>
      { isLoading ? (
         <Spinner animation="border" role="status" variant="light">
         <span className="visually-hidden">Loading...</span>
       </Spinner>
      ) : (notifications && (
        <div>
          {notifications.length === 0 ? (
            <div>
            <h3 className="text-white text-md flex justify-center m-6">NO NOTIFICATIONS</h3>
            <div className='w-100 justify-center'>
              <iframe
                allow='fullscreen'
                height='500'
                src='https://giphy.com/embed/A1flx6jEbWQc89rV1f/video'
                width='700'
              ></iframe>
            </div>
            </div>
          ) : (
            notifications.map((notification, i) => {
              const { cta, title, message, app, icon, image, url } =
                notification
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
              )
            })
          )}
        </div>
      ))}
    </div>
  )
}

export default Notifications
