function EmptyState({ title = "Nothing here yet", desc = "Try adding something" }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2">{desc}</p>
    </div>
  )
}

export default EmptyState