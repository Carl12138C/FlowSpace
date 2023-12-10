import PropTypes from "prop-types";
import classNames from "classnames";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions,
} from "./CalendarHelpers";

CalendarComponent.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func,
};
export default function CalendarComponent({
  className = "",
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = () => null,
  renderTask = () => null,
  userTask = null,
  modalData = null,
  isOpen = null,
  setIsOpen,
}) {
  const [year, month] = yearAndMonth;
  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  return (
    <div className="calendar-root">
      <div className="navigation-header">
        <div className="month-nav-arrow-buttons">
          <button onClick={handleMonthNavBackButtonClick}> Prev </button>
          <button onClick={handleMonthNavForwardButtonClick}> Next</button>
        </div>
        <select
          className="month-select"
          value={month}
          onChange={handleMonthSelect}
        >
          {getMonthDropdownOptions().map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="year-select"
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={classNames("day-of-week-header-cell", {
              "weekend-day": [6, 0].includes(index),
            })}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {calendarGridDayObjects.map((day) => (
          <div
            key={day.dateString}
            className={classNames("day-grid-item-container", {
              "weekend-day": isWeekendDay(day.dateString),
              "current-month": day.isCurrentMonth,
            })}
          >
            <div className="day-content-wrapper">
              {renderDay(day)}{" "}
              {userTask.dateTask[day.dateString]?.task.map((task) =>
                renderTask(task)
              )}
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="modal">
          <div
            className="overlay"
            onClick={() => {
              setIsOpen(false);
              modalData.current = null;
            }}
          ></div>
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => {
                setIsOpen(false);
                modalData.current = null;
              }}
            >
              Close
            </button>
            <div className="modal-data-container">
            <h2>{modalData.current?.title}</h2>
            <h3>{modalData.current?.deadline}</h3>
            <h4>{modalData.current?.description}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired,
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}
