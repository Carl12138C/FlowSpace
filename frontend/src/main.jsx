import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./pages/Chat.jsx";
import Tasklist from "./pages/Tasklist.jsx";
import Calendar from "./pages/Calendar.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import "./app.css";

<<<<<<< HEAD
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
=======
import { RouterProvider, createBrowserRouter } from "react-router-dom";
>>>>>>> ba6b43c516b21a66d321f68c2a59df3fd1d4f114

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
