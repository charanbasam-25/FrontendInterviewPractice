import { useState } from "react";

function getCalenderView(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const NumberOfDays = new Date(year, month + 1, 0).getDate();

  const calender = [];
  for (let k = 0; k < firstDay; k++) {
    calender.push(null);
  }
  for (let k = 1; k <= NumberOfDays; k++) {
    calender.push(k);
  }

  const weekSep = [];
  for (let i = 0; i < calender.length; i = i + 7) {
    weekSep.push(calender.slice(i, i + 7));
  }
  return weekSep;
}

let days = ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"];
function CalenderView() {
  const [inputDate, SetInputDate] = useState(new Date());
  let today = new Date();
  const weeks = getCalenderView(inputDate.getFullYear(), inputDate.getMonth());

  return (
    <div className="calender-view">
      <table className="calender-table">
        <thead>
          <tr>
            {days.map((day, index) => {
              return <th key={index}>{day}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {weeks.map((eachWeek, index) => {
            return (
              <tr key={index}>
                {eachWeek.map((day, index) => {
                  const isToday =
                    today.getDate() == day &&
                    today.getMonth() == inputDate.getMonth() &&
                    today.getFullYear() == inputDate.getFullYear();
                  return (
                    <td
                      key={index}
                      className={[isToday ? "current" : ""]
                        .filter(Boolean)
                        .join("")}
                    >
                      {day || ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CalenderView;
