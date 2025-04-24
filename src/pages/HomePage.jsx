// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet, Link } from "react-router-dom";

function HomePage() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hi and Welcome to would you rather</h1>
          <p className="py-6">
            You can make your choice between soon
          </p>
          <button className="btn btn-primary">
          <Link to="/questions">Get Started</Link>
            </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage
