// import ";
import "../css/calendar.css"
import { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarDayHeader } from "../components/CalendarComponent";
<<<<<<< HEAD

export default function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([2023, 10]);
  return (
    <>
=======
export default function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([2023, 10]);
  return (
    <div className="App">
>>>>>>> 923ceb8cdd94accebd9bbf01faf080a5f3dab9fb
      <CalendarComponent
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={(calendarDayObject) => (
          <div>
            <CalendarDayHeader calendarDayObject={calendarDayObject} />
          </div>
        )}
      />
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 923ceb8cdd94accebd9bbf01faf080a5f3dab9fb
  );
}
