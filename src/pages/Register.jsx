import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  const isAuth = localStorage.getItem("isAuth")
  if (isAuth) {
    navigate("/dashboard")
  }
}, [])

  const handleRegister = () => {
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Enter a valid email")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    setTimeout(() => {
  const userData = {
    email,
    password,
  }

  localStorage.setItem("user", JSON.stringify(userData))

  setLoading(false)
  navigate("/login")
}, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white px-4">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        <h1 className="text-4xl font-bold text-center mb-3">
          Create Account ✨
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Register to continue
        </p>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 mb-4 outline-none"
        />

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

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 mb-4 outline-none"
        />

        {error && (
          <p className="text-red-400 mb-4 text-sm">
            {error}
          </p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </div>
    </div>
  )
}

export default Register