import { useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">

      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 mt-2">Page not found</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl"
      >
        Go Home
      </button>

    </div>
  )
}

export default NotFound