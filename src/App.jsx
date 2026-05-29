import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Feed from "./pages/Feed"
import AIAssistant from "./pages/AIAssistant"
import Messaging from "./pages/Messaging"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

import ProtectedRoute from "./routes/ProtectedRoute"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          <Route path="/feed" element={
            <ProtectedRoute><Feed /></ProtectedRoute>
          } />

          <Route path="/ai" element={
            <ProtectedRoute><AIAssistant /></ProtectedRoute>
          } />

          <Route path="/messages" element={
            <ProtectedRoute><Messaging /></ProtectedRoute>
          } />

          <Route path="/notifications" element={
            <ProtectedRoute><Notifications /></ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}