import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Courses, Login, Shop, Register, Home } from './pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "courses",
    element: <Courses />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "register",
    element: <Register />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)