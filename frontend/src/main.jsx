import React from "react";
import ReactDOM from "react-dom/client";
import ChatPage from "./pages/ChatPage.jsx";
import Tasklist from "./pages/Tasklist.jsx";
import Calendar from "./pages/Calendar.jsx";
import "./index.css";
import "./app.css";
import Login from "./pages/Login.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        element: <MainLayout />,
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
          },
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
