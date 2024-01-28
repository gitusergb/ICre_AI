/* eslint-disable no-unused-vars */
 import React from 'react'
import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import { Home} from './pages/Home';
import {CreatePost } from "./pages/CreatePost"

const App = () => {
  return (
    <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#424242] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <div className="flex justify-between w-auto items-center text-white font-inter ">
        <img src='https://i.ibb.co/ZX7hLZX/Iogo.png' alt="logo" className="w-22 object-contain rounded-md h-10 " />_AI
        </div>
      </Link>
      <Link to="/create-post" className="font-inter font-medium bg-[#424242] text-white px-4 py-2 rounded-md">Create</Link>
      
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-opacity-25 bg-gradient-to-r from-cyan-500 to-blue-500 min-h-[calc(100vh-73px)] bg-no-repeat bg-cover bg-center bg-fixed">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App