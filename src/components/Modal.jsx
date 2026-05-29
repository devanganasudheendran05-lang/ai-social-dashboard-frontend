function Modal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-xl font-bold">Modal</h2>
        <p className="mt-2">This is a modal component.</p>
      </div>
    </div>
  )
}

export default Modal