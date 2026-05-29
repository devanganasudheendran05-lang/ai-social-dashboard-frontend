import { motion } from "framer-motion"

function Profile() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto space-y-6"
      >

        {/* HEADER */}
        <div className="bg-gray-100 dark:bg-[#151515] p-6 rounded-2xl">
          <h1 className="text-3xl font-bold">Your Profile 👤</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage your account details
          </p>
        </div>

        {/* USER CARD */}
        <div className="bg-gray-100 dark:bg-[#151515] p-6 rounded-2xl flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>

          <div>
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-gray-500">user@email.com</p>
          </div>

        </div>

        {/* INFO */}
        <div className="bg-gray-100 dark:bg-[#151515] p-6 rounded-2xl space-y-4">

          <div>
            <p className="text-gray-500">Bio</p>
            <p>Content creator | AI enthusiast | building cool stuff 🚀</p>
          </div>

          <div>
            <p className="text-gray-500">Account Status</p>
            <p className="text-green-500">Active</p>
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-gray-100 dark:bg-[#151515] p-5 rounded-2xl text-center">
            <p className="text-gray-500">Posts</p>
            <h2 className="text-2xl font-bold">24</h2>
          </div>

          <div className="bg-gray-100 dark:bg-[#151515] p-5 rounded-2xl text-center">
            <p className="text-gray-500">Followers</p>
            <h2 className="text-2xl font-bold">1.2K</h2>
          </div>

          <div className="bg-gray-100 dark:bg-[#151515] p-5 rounded-2xl text-center">
            <p className="text-gray-500">Following</p>
            <h2 className="text-2xl font-bold">180</h2>
          </div>

        </div>

      </motion.div>

    </div>
  )
}

export default Profile