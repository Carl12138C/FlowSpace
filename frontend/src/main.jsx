import React from "react";
import ReactDOM from "react-dom/client";
import ChatPage from "./pages/ChatPage.jsx";
import Tasklist from "./pages/Tasklist.jsx";
import Calendar from "./pages/Calendar.jsx";
import "./index.css";
import "./app.css";
import Login from "./pages/Login.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Register from "./pages/Register.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      // Index = default main page
      {
        path: "register",
        element: <Register />,
      },
      {
        index: true,
        element: <Login />,
      },
      {
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
          {
            path: "chat",
            element: <ChatPage />,
          },
          {
            path: "tasklist",
            element: <Tasklist />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <RouterProvider router={routes} />
    </AuthContext>
  </React.StrictMode>
);
