import React from "react";
import useTimeFormat from "../../hook/useTimeFormat";

export function Timetabling() {
  const [convertMinutes] = useTimeFormat();
  const time = [
    420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840,
    870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230,
    1260,
  ];
  const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const sampleSchedule = [
    {
      Day: "Monday",
      Time: 600,
      Units: 1,
      Course: "Scheduling Sample 2",
    },
    {
      Day: "Monday",
      Time: 420,
      Units: 2.5,
      Course: "Scheduling Sample 1",
    },
    {
      Day: "Tuesday",
      Time: 600,
      Units: 4,
      Course: "Scheduling Sample 3",
    },
  ];

  function getTotalUnits(day) {
    var units = 0;
    sampleSchedule.forEach((schedule) => {
      if (schedule.Day === day) {
        units += schedule.Units;
      }
    });
    return units;
  }

  function getAllScheduleOf(day) {
    var schedules = [];
    sampleSchedule.forEach((schedule) => {
      if (schedule.Day === day) {
        schedules.push(schedule);
      }
    });
    schedules.sort((a, b) => a.Time - b.Time);
    return schedules;
  }

  console.log(getAllScheduleOf("Monday"));
  return (
    <main className="p-2 h-100 w-100">
      <table
        className="h-100 w-100 rounded table-bordered border-secondary"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <td className="p-2" style={{ width: "10%" }}>
              Day / Time
            </td>
            {day.map((daytime, index) => (
              <td className="p-2">{daytime}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {time.map((timeslot, index) => (
            <tr>
              <td className="p-2">{convertMinutes(timeslot)}</td>
              {day.map((daytime, index) => (
                <td>
                  {getAllScheduleOf(daytime).map((schedule, item) =>
                    schedule.Day === daytime ? (
                      schedule.Time === timeslot ? (
                        <div
                          className="h-100 w-100 bg-info d-flex align-items-center text-truncate text-start text-break text-wrap"
                          onClick={() => alert(schedule.Course)}
                        >
                          <small className="ms-1">{schedule.Course}</small>
                        </div>
                      ) : schedule.Time + 60 * schedule.Units === timeslot ? (
                        <div
                          className="h-100 w-100 bg-info d-flex align-items-center"
                          onClick={() => alert(schedule.Course)}
                        >
                          <small></small>
                        </div>
                      ) : schedule.Time + 60 * schedule.Units > timeslot &&
                        schedule.Time < timeslot ? (
                        <div
                          className="h-100 w-100 bg-info d-flex align-items-center"
                          onClick={() => alert(schedule.Course)}
                        >
                          <small></small>
                        </div>
                      ) : null
                    ) : null
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
