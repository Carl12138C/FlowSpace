import { Navigate } from "react-router";
import { getUserContext } from "../context/AuthContext";

export default function ProtectedRoute({children}) {
    const {userData} = getUserContext();

    return(
        <>
            {( userData ) ? children : <Navigate to="/"/>}
        </>
    );
}

