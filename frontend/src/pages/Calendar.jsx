// import ";
import "../css/calendar.css"
import { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarDayHeader } from "../components/CalendarComponent";
import { getUserContext } from "../context/AuthContext";
import { getUserData,getUserTask,updateUserTask } from "../FirebaseUtil";


export default function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([2023, 10]);
  const uid = getUserContext().userData.uid;
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
      />
      <button onClick={() =>handleSet(uid)}>Set Task</button>
      <button onClick={() => handleGetTask(uid)}>Get Task</button>
      <button onClick = {() =>handleGetUserData(uid)}>Get UserData</button>

    </>
  );
}
async function handleSet(uid){
  const response = await updateUserTask(uid,[{title: "Writing Assignment", description:"Complete Writing assignment for Operating System", deadline: "11/29/2023", isdone: false },{title: "Coding Assignment", description:"Complete Coding Assignment for Programmin Language and Implementation", deadline: "11/29/2023", isdone: false}]);
}
async function handleGetTask(uid){
  const response = await getUserTask(uid);
  console.log(response.data);
}
async function handleGetUserData(uid){
  const response = await getUserData(uid);
  console.log(response.data);
}
