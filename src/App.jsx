import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App