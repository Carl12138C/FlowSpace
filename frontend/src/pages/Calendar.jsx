// import ";
import "../css/calendar.css";
import { useEffect, useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarDayHeader } from "../components/CalendarComponent";
import { getUserContext } from "../context/AuthContext";
import { getUserData, getUserTask, updateUserTask } from "../FirebaseUtil";

export default function Calendar() {
  const uid = getUserContext().userData.uid;
  const [yearAndMonth, setYearAndMonth] = useState([2023, 10]);
  const [userTask, setUserTask] = useState(getUserContext().userData.userTask ?? {data:[], dateTask:{}});
  const [isOpen, setIsOpen] = useState(false);
  console.log(userTask);

  async function fetchData() {
    const userTaskData = await getUserTask(uid);
    setUserTask(userTaskData);
  }
  useEffect(() => {}, []);
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
        userTask={userTask}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchData={fetchData}
      />
    </>
  );
}
