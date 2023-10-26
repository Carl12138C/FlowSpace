import { getUserContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Home() {
  const UserContext = getUserContext();
  const navigate = useNavigate();

  function login() {
    UserContext.setUserData("boo");
    navigate("/chat");
  }
  return (
    <>
      <h1>This is Home</h1>
      <button onClick={login} style={{height: "20px"}}>
        Login
      </button>
    </>
  );
}
