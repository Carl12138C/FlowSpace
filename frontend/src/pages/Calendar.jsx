// import ";
import "../css/calendar.css"
import { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarDayHeader } from "../components/CalendarComponent";

export default function Calendar() {
  const [yearAndMonth, setYearAndMonth] = useState([2023, 10]);
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
    </>
  );
}
