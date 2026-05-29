import { useEffect, useState } from "react"
import socket from "../services/socket"
import { FaCircle } from "react-icons/fa"

function Messaging() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [onlineUsers] = useState(["Ava", "Noah", "Emma"])
  const [typingUser, setTypingUser] = useState(false)

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data])
    })

    socket.on("typing", () => {
      setTypingUser(true)

      setTimeout(() => {
        setTypingUser(false)
      }, 1500)
    })

    return () => {
      socket.off("message")
      socket.off("typing")
    }
  }, [])

  const sendMessage = () => {

    // ✅ ADDED VALIDATION ONLY
    if (!message || message.trim() === "") return

    const msgData = {
      text: message,
      sender: "You",
      time: new Date().toLocaleTimeString(),
    }

    socket.emit("message", msgData)

    setMessages((prev) => [...prev, msgData])
    setMessage("")
  }

  const handleTyping = (e) => {
    setMessage(e.target.value)
    socket.emit("typing")
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      <div className="w-1/4 border-r border-gray-800 p-5">
        <h2 className="text-2xl font-bold mb-6">Chats</h2>

        {onlineUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 hover:bg-[#151515] rounded-xl cursor-pointer"
          >
            <FaCircle className="text-green-500 text-xs" />
            <p>{user}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">

        <div className="border-b border-gray-800 p-4">
          <h2 className="text-xl font-bold">Live Chat 💬</h2>
          <p className="text-green-500 text-sm">● Online</p>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-4">

          {messages.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Start a conversation...
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[60%] ${
                  msg.sender === "You"
                    ? "bg-blue-600"
                    : "bg-[#151515]"
                }`}
              >
                <p className="font-semibold text-sm mb-1">
                  {msg.sender}
                </p>

                <p>{msg.text}</p>

                <span className="text-xs text-gray-400">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {typingUser && (
            <p className="text-gray-400 italic">
              Someone is typing...
            </p>
          )}
        </div>

        <div className="border-t border-gray-800 p-4 flex gap-3">
          <input
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 bg-[#151515] p-3 rounded-xl outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 px-6 rounded-xl font-semibold"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default Messaging