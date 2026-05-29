import { Link } from "react-router-dom"

function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold mb-5">
        AI Social Dashboard 🚀
      </h1>

      <p className="text-gray-400 max-w-2xl mb-8 text-lg">
        Manage your social media, AI assistant, messaging, and analytics all in one place.
      </p>

      <div className="flex gap-4">
        <Link to="/login">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing