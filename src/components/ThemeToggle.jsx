import { useTheme } from "../context/ThemeContext"
import { FaSun, FaMoon } from "react-icons/fa"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-800 dark:bg-white text-white dark:text-black transition-all duration-300"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle