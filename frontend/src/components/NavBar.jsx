import { Link } from "react-router-dom";

export default function NavBar() {
  return (
      <div id="nav">
        <Link to={"/chat"}>
          <button>Chat</button>
        </Link>
        <Link to={"/tasklist"}>
          <button>Task</button>
        </Link>
        <Link to={"/calendar"}>
          <button>Calendar</button>
        </Link>
        <Link to={"/"}>
          <button>Test</button>
        </Link>
      </div>
  );
}
