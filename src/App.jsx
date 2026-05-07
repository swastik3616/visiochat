import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Chats from "./pages/chats"
import AdminChat from "./pages/adminchat"
import MemberChat from "./pages/memberchat"
import CreateGroup from "./pages/creategroup"
import ProtectedRoute from "./components/protectedroute"
import PublicRoute from "./components/PublicRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes - redirect to chats if logged in */}
        <Route path="/" element={
          <PublicRoute>
            <Splash />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        {/* Protected Routes - redirect to login if not logged in */}
        <Route path="/chats" element={
          <ProtectedRoute>
            <Chats />
          </ProtectedRoute>
        } />
        <Route path="/chat/admin/:groupId" element={
          <ProtectedRoute>
            <AdminChat />
          </ProtectedRoute>
        } />
        <Route path="/chat/member/:groupId" element={
          <ProtectedRoute>
            <MemberChat />
          </ProtectedRoute>
        } />
        <Route path="/create-group" element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App