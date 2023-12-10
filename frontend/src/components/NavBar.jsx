import { Link } from "react-router-dom";
import chat_button from "../../../image/chat_button.png";
import task_button from "../../../image/task_button.png";
import calendar_button from"../../../image/calendar_button.png";

export default function NavBar() {
  return (
      <div id="nav">
        <Link to={"/chat"} data-cy="link-chat">
          <img id = "chat_button" src = {chat_button} ></img>
        </Link>
        <Link to={"/tasklist"} data-cy="link-tasklist">
          <img id = "task_button" src = {task_button}></img>
        </Link>
        <Link to={"/calendar"} data-cy="link-calendar">
          <img src = {calendar_button}></img>
        </Link>
      </div>
  );
}
