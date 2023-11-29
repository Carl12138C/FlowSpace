// import ";
import "../css/calendar.css"
import { useEffect, useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarDayHeader } from "../components/CalendarComponent";
import { getUserContext } from "../context/AuthContext";
import { getUserData,getUserTask,updateUserTask } from "../FirebaseUtil";



  

export default function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([2023, 10]);
  const [userTask, setUserTask] = useState([]);
  const uid = getUserContext().userData.uid;
  useEffect(()=>{
    const fetchData = async () =>{
      const userTask = await getUserTask(uid);
      setUserTask(userTask.data);
    }
    fetchData();
    // console.log(userTask);
    return;
  },[]);
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
        userTask = {userTask}
      />
    </>
  );
}
