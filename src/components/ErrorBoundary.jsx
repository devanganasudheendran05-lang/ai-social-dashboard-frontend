import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
          <h1 className="text-3xl font-bold">Something went wrong ⚠️</h1>
          <p className="text-gray-400 mt-2">
            Please refresh the page or try again later.
          </p>

          <button
            className="mt-5 px-6 py-3 bg-white text-black rounded-xl"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary