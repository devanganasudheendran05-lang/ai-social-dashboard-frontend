function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AI Dashboard</h1>
      <button className="bg-white text-black px-4 py-2 rounded">
        Login
      </button>
    </nav>
  )
}

export default Navbar