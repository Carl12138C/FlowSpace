import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MainLayout() {
  return (
<<<<<<< HEAD
    <div id="root">
=======
    <div id="root" className="shadow">
>>>>>>> 923ceb8cdd94accebd9bbf01faf080a5f3dab9fb
      <ProtectedRoute>
        <NavBar />
        <Outlet />
      </ProtectedRoute>
    </div>
  );
}
