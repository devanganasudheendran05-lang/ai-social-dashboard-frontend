import { useEffect, useState } from "react"
import socket from "../services/socket"

function Notifications() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev])
    })

    // FAKE LIVE NOTIFICATIONS
    const interval = setInterval(() => {
      const fakeNotification = {
        text: "🔥 Someone liked your post",
        time: new Date().toLocaleTimeString(),
      }

      socket.emit("notification", fakeNotification)

      setNotifications((prev) => [
        fakeNotification,
        ...prev,
      ])
    }, 5000)

    return () => {
      clearInterval(interval)
      socket.off("notification")
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-5">

      <h1 className="text-4xl font-bold text-center mb-10">
        Live Notifications 🔔
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">

        {notifications.length === 0 ? (
          <div className="text-center text-gray-500">
            No notifications yet.
          </div>
        ) : (
          notifications.map((note, index) => (
            <div
              key={index}
              className="bg-[#151515] border border-gray-700 p-5 rounded-2xl"
            >

              <p>{note.text}</p>

              <span className="text-sm text-gray-500 mt-2 block">
                {note.time}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default Notifications