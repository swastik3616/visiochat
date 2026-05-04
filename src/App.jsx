import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/login"
import Signup from "./pages/Signup"
import Chats from "./pages/chats"
import AdminChat from "./pages/adminchat"
import MemberChat from "./pages/memberchat"

function App() {
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

export default App