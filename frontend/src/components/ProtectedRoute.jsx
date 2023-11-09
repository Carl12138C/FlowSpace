import { Navigate } from "react-router";
import { getUserContext } from "../context/AuthContext";

export default function ProtectedRoute({children}) {
    const authData = getUserContext();

    // console.log(authData);
    //authData.userData.uid
    return(
        <>
            {( true ) ? children : <Navigate to="/"/>}
        </>
    );
}

