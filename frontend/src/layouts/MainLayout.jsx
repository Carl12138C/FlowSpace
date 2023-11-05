import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MainLayout() {
  return (
    <div id="root" className="shadow">
      <ProtectedRoute>
        <NavBar />
        <Outlet />
      </ProtectedRoute>
    </div>
  );
}
