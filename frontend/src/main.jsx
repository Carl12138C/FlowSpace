import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chat from './pages/Chat.jsx'
import Tasklist from './pages/Tasklist.jsx'
import Calendar from './pages/Calendar.jsx'
import './index.css'



import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path:"/",
    //login page
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:"chat",
        element:<Chat/>,
      },
      {
        path:"tasklist",
        element:<Tasklist/>,
      },
      {
        path:"calendar",
        element:<Calendar/>,
      },
    ]

  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
)
