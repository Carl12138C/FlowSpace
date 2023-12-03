import "../css/calendar.css";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarDayHeader } from "../components/CalendarComponent";
import { getUserContext } from "../context/AuthContext";
import { getUserData, getUserTask, updateUserTask } from "../FirebaseUtil";

export default function Calendar() {
  const uid = getUserContext().userData.uid;
  const [yearAndMonth, setYearAndMonth] = useState([dayjs().year(), dayjs().month()+1]);
  const [userTask, setUserTask] = useState(
    getUserContext().userData.userTask ?? { data: [], dateTask: {} }
  );
  const [isOpen, setIsOpen] = useState(false);
  const modalData = useRef();

  async function fetchData() {
    const userTaskData = await getUserTask(uid);
    setUserTask(userTaskData);
  }
  return (
    <>
      <CalendarComponent
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={(calendarDayObject) => (
          <div>
            <CalendarDayHeader calendarDayObject={calendarDayObject} />
          </div>
        )}
        renderTask={(taskObject) => (
          <div
            key = {taskObject.title}
            className="calendar-task"
            onClick={() => {
              setIsOpen(true);
              modalData.current = taskObject;
              console.log(modalData);
            }}
          >
            {taskObject.title}
          </div>
        )}
        userTask={userTask}
        modalData={modalData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchData={fetchData}
      />
    </>
  );
}
