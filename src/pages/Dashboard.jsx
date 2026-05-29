import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FaHome,
  FaFire,
  FaRobot,
  FaBell,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa"

import { motion } from "framer-motion"

import { useTheme } from "../context/ThemeContext"
import ThemeToggle from "../components/ThemeToggle"

function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isAuth")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex transition-all duration-300">

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed md:static z-50 top-0 left-0 h-full w-64 bg-gray-100 dark:bg-[#0f0f0f] border-r border-gray-300 dark:border-gray-800 p-6"
      >
        <h1 className="text-3xl font-bold mb-10">SocialAI</h1>

       <ul className="space-y-6 text-lg">

  <li
    onClick={() => navigate("/dashboard")}
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
  >
    <FaHome /> Dashboard
  </li>

  <li
    onClick={() => navigate("/feed")}
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
  >
    <FaFire /> Feed
  </li>

  <li
    onClick={() => navigate("/ai")}
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
  >
    <FaRobot /> AI Assistant
  </li>

  <li
    onClick={() => navigate("/notifications")}
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
  >
    <FaBell /> Notifications
  </li>

  <li
    onClick={() => navigate("/profile")}
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
  >
    <FaUserFriends /> Profile
  </li>

</ul>
      </motion.div>

      {/* MAIN */}
      <div className="flex-1 w-full">

        {/* TOP BAR */}
        <div className="px-6 py-4 border-b flex justify-between items-center">

          <h1 className="text-2xl font-bold">Welcome Back 👋</h1>

          <div className="flex gap-3 items-center">
            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {["Followers", "Engagement", "Growth"].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 dark:bg-[#151515] p-5 rounded-2xl"
                >
                  <p>{item}</p>
                  <h2 className="text-3xl font-bold mt-2">12.4K</h2>
                </motion.div>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-100 dark:bg-[#151515] p-6 rounded-2xl"
            >
              Trending 🔥
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-2xl text-white"
            >
              AI Assistant 🤖
            </motion.div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard