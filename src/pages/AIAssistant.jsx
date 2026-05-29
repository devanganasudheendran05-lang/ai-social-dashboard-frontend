import { useState, useEffect } from "react"
import axios from "axios"

import {
  FaRobot,
  FaUserCircle,
} from "react-icons/fa"

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hey 👋 I’m your AI assistant.",
    },
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const suggestions = [
    "Give me viral reel ideas",
    "Write an Instagram caption",
    "Best hashtags for fashion content",
    "How to grow on Instagram?",
  ]

  const handleSend = async (messageText = input) => {

    // ✅ ADDED VALIDATION ONLY (NO CHANGES TO YOUR LOGIC)
    if (!messageText || messageText.trim() === "") return

    const userMessage = {
      sender: "user",
      text: messageText,
    }

    setMessages((prev) => [...prev, userMessage])

    setInput("")
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: messageText,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_OPENROUTER_API_KEY
            }`,
            "Content-Type": "application/json",
          },
        }
      )

      const aiReply =
        response.data.choices[0].message.content

      const aiMessage = {
        sender: "ai",
        text: aiReply,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      setError("Failed to get AI response 😭")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [messages])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="border-b border-gray-800 p-5 text-center sticky top-0 bg-black z-50">

        <h1 className="text-4xl font-bold">
          AI Assistant 🤖
        </h1>

        <p className="text-gray-400 mt-2">
          Your personal content creation assistant
        </p>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 max-w-3xl mx-auto w-full p-5 space-y-5">

        {/* SUGGESTIONS */}
        <div className="flex flex-wrap gap-3 mb-6">

          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSend(suggestion)}
              className="bg-[#151515] border border-gray-700 px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              {suggestion}
            </button>
          ))}

        </div>

        {/* CHAT MESSAGES */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`flex items-end gap-3 max-w-[80%] ${
                msg.sender === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >

              <div className="text-3xl">

                {msg.sender === "ai" ? (
                  <FaRobot className="text-blue-400" />
                ) : (
                  <FaUserCircle />
                )}

              </div>

              <div
                className={`p-4 rounded-2xl text-lg ${
                  msg.sender === "user"
                    ? "bg-blue-600"
                    : "bg-[#151515] border border-gray-700"
                }`}
              >
                {msg.text}
              </div>

            </div>

          </div>
        ))}

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-3">

            <FaRobot className="text-blue-400 text-3xl" />

            <div className="bg-[#151515] border border-gray-700 px-5 py-4 rounded-2xl">
              AI is typing...
            </div>

          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-red-500 text-center">
            {error}
          </div>
        )}

      </div>

      {/* INPUT */}
      <div className="border-t border-gray-800 p-5 bg-black sticky bottom-0">

        <div className="max-w-3xl mx-auto flex gap-3">

          <input
            type="text"
            placeholder="Ask AI something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#151515] border border-gray-700 p-4 rounded-2xl outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-2xl font-semibold transition"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}

export default AIAssistant