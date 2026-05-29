import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  const isAuth = localStorage.getItem("isAuth")
  if (isAuth) {
    navigate("/dashboard")
  }
}, [])

  const handleLogin = () => {
    setError("")

    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Enter a valid email")
      return
    }

    setLoading(true)

    setTimeout(() => {
     const storedUser = JSON.parse(localStorage.getItem("user"))

if (
  storedUser &&
  storedUser.email === email &&
  storedUser.password === password
) {
  localStorage.setItem("isAuth", "true")
  setLoading(false)
  navigate("/dashboard")
} else {
  setLoading(false)
  setError("Invalid email or password")
}
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        <h1 className="text-4xl font-bold text-center mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Login to continue to your dashboard
        </p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 mb-4 outline-none"
        />

        {error && (
          <p className="text-red-400 mb-4 text-sm">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </div>
    </div>
  )
}

export default Login