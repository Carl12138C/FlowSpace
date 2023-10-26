import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Chat from "./pages/Chat.jsx";
import Tasklist from "./pages/Tasklist.jsx";
import Calendar from "./pages/Calendar.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
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
        element: <Home />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "chat",
            element: <Chat />,
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
