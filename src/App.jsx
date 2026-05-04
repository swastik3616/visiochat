import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App