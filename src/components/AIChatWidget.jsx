function AIChatWidget() {
  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md">
      <h2 className="font-bold text-lg">AI Assistant</h2>
      <input
        type="text"
        placeholder="Ask AI something..."
        className="w-full mt-3 p-2 border rounded"
      />
      <button className="bg-black text-white px-4 py-2 rounded mt-3">
        Send
      </button>
    </div>
  )
}

export default AIChatWidget