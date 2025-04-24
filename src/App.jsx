// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuestionPage from './pages/QuestionPage'
import Navbar from './components/Navbar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/questions" element={<QuestionPage />} />
      </Routes>
    </>
  )
}

export default App
