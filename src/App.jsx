import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chats from "./pages/Chats"
import AdminChat from "./pages/AdminChat"
import MemberChat from "./pages/MemberChat"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/admin/:groupId" element={<AdminChat />} />
        <Route path="/chat/member/:groupId" element={<MemberChat />} />
      </Routes>
    </BrowserRouter>
  )
}