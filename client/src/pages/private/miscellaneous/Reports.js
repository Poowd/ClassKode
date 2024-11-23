import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { useCoachUnits } from "../../../hook/useCoachUnits";
import useTimeFormat from "../../../hook/useTimeFormat";
import * as XLSX from "xlsx";
import { useRoomUsage } from "../../../hook/useRoomUsage";
import { useLogs } from "../../../hook/useLogs";

export function Reports() {
  const [getRoomUsage, getRoomUsageWeek] = useRoomUsage();
  const [get, post, data_get, data_post] = useDatabase();
  const [recordLog] = useLogs();
  const [convertMinutes] = useTimeFormat();
  const [academicYear, setAcademicYear] = useState([]);
  const [sections, setSections] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [coachReports, setCoachReports] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setAcademicYear);
    data_get("project-list", setSections);
    data_get("room-list", setRooms);
    data_get("assign-list", setCoaches);
    data_get("class-schedule-list", setSchedules);
  }, []);

  const countSectionSchedule = (target_section) => {
    var count = 0;
    schedules.forEach((schedule) => {
      if (schedule.Section === target_section) {
        count += 1;
      }
    });
    return count;
  };

  const countSectionUnits = (target_section) => {
    var count = 0;
    schedules.forEach((schedule) => {
      if (schedule.Section === target_section) {
        count += +schedule.Units;
      }
    });
    return count;
  };

  const countClasses = (target_level) => {
    var count = 0;
    schedules.forEach((schedule) => {
      if (schedule.AcademicLevel === target_level) {
        count += 1;
      }
    });
    return count;
  };

  const getTotalPopulation = () => {
    var population = 0;
    sections.forEach((section) => {
      population += +section.Population;
    });
    return population;
  };

  const getTotalPerLevel = (target_level) => {
    var population = 0;
    sections.forEach((section) => {
      if (section.AcademicLevel === target_level) {
        population += +section.Population;
      }
    });
    return population;
  };

  const countCoachTypes = (target_type) => {
    var count = 0;
    coaches.forEach((coach) => {
      if (coach.CoachType === target_type) {
        count += 1;
      }
    });
    return count;
  };

  const getTotalCoachUnits = (target_coach) => {
    var units = 0;
    schedules.forEach((schedule) => {
      if (schedule.SCHLID === target_coach) {
        units += +schedule.Units;
      }
    });
    return units;
  };

  const countFacility = (target_facility) => {
    var count = 0;
    rooms.forEach((room) => {
      if (room.Facility.includes(target_facility)) {
        count += 1;
      }
    });
    return count;
  };

  const getRoomUnits = (target_room) => {
    var count = 0;
    schedules.forEach((schedule) => {
      if (schedule.Room === target_room) {
        count += +schedule.Units;
      }
    });
    return count;
  };

  const getRoomUnitsDay = (target_room, target_day) => {
    var count = 0;
    schedules.forEach((schedule) => {
      if (schedule.Room === target_room && schedule.Day === target_day) {
        count += +schedule.Units;
      }
    });
    return count;
  };

  function exportJsonToExcel(schedule, coach, section, room) {
    var CoachesReports = [];
    var SectionsReports = [];
    var RoomsReports = [];
    coaches.forEach((coach) => {
      CoachesReports.push({
        ID: coach.SCHLID,
        Firstname: coach.FirstName,
        LastName: coach.LastName,
        Department: coach.Department,
        Type: coach.CoachType,
        Units: getTotalCoachUnits(coach.SCHLID),
        TotalUnits: coach.MAX,
      });
    });
    sections.forEach((section) => {
      SectionsReports.push({
        Section: section.Section,
        YearLevel: section.YearLevel,
        Program: section.Program,
        Population: section.Population,
        TotalClasses: countSectionSchedule(section.Section),
        Units: countSectionUnits(section.Section),
      });
    });
    rooms.forEach((room) => {
      RoomsReports.push({
        Room: room.Room,
        Building: room.Building,
        Floor: room.Floor,
        Facility: room.Facility,
        Capacity: room.Capacity,
        "": "",
        Monday: getRoomUnitsDay(room.Room, "Monday"),
        Tuesday: getRoomUnitsDay(room.Room, "Tuesday"),
        Wednesday: getRoomUnitsDay(room.Room, "Wednesday"),
        Thursday: getRoomUnitsDay(room.Room, "Thursday"),
        Friday: getRoomUnitsDay(room.Room, "Friday"),
        Units: getRoomUnits(room.Room),
        TotalUnits: `${getRoomUsageWeek(getRoomUnits(room.Room))}%`,
      });
    });
    setTimeout(() => {
      const workbook = XLSX.utils.book_new();
      const schedules = XLSX.utils.json_to_sheet(schedule);
      const coaches = XLSX.utils.json_to_sheet(CoachesReports);
      const sections = XLSX.utils.json_to_sheet(SectionsReports);
      const rooms = XLSX.utils.json_to_sheet(RoomsReports);
      XLSX.utils.book_append_sheet(workbook, schedules, "Schedules");
      XLSX.utils.book_append_sheet(workbook, coaches, "Coaches");
      XLSX.utils.book_append_sheet(workbook, sections, "Sections");
      XLSX.utils.book_append_sheet(workbook, rooms, "Rooms");
      XLSX.writeFile(workbook, "CK_STI_Reports.xlsx");
    }, 1000);
  }

  const getReports = () => {};

  return (
    <main className="w-100 h-100 p-2 m-0">
      <section className="p-3 shadow-sm bg-white rounded h-100 overflow-y-auto">
        <main className="container">
          <header className="row m-0 p-2">
            <section className="col-lg-6 p-0 m-0">
              <section className="text-lg-start text-center">
                <h1 className="m-0 fw-bold primary-text">Class Kode Reports</h1>
                <p className="m-0">STI College Muñoz-EDSA</p>
                <p className="m-0">Schedule Report</p>
              </section>
            </section>
            <section className="col-lg-6 p-0 m-0">
              <section className="text-lg-end text-center">
                <h6 className="m-0">{academicYear.AcademicYear}</h6>
                <p className="m-0">{academicYear.Curriculum}</p>
                <p className="m-0">{`${academicYear.StartDate} - ${academicYear.EndDate}`}</p>
              </section>
            </section>
          </header>
          <button
            className="btn w-100 border"
            onClick={() => {
              exportJsonToExcel(schedules, coachReports, sections, rooms);
            }}
          >
            Download XLSX File of the Reports
          </button>
          <hr></hr>
          <main>
            <header>
              <h5 className="mt-5 mb-3 fw-bold text-center">Class Reports</h5>
            </header>
            <section className="row m-0 p-0">
              <section className="col-lg-4 ps-0 text-center">
                <section className="d-flex flex-column gap-2">
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Total</h6>
                    <p className="m-0">{`${schedules.length} class/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Senior High School</h6>
                    <p className="m-0">{`${countClasses(
                      "Senior High School"
                    )} class/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Tertiary</h6>
                    <p className="m-0">{`${countClasses(
                      "Tertiary"
                    )} class/s`}</p>
                  </section>
                </section>
              </section>
              <section
                className="col-lg-8 overflow-y-auto border rounded"
                style={{ height: "50vh" }}
              >
                <section className="row m-0 p-0  p-3 px-5 text-center">
                  <table
                    className="table table-hover"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-start">Course</th>
                        <th>Day</th>
                        <th className="text-end">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules &&
                        schedules.map((schedule, schedule_index) => (
                          <tr key={schedule_index}>
                            <td className="text-start">{`${schedule.Course}`}</td>
                            <td>{`${schedule.Day}`}</td>
                            <td className="text-end">{`${convertMinutes(
                              schedule.StartTime
                            )} - ${convertMinutes(schedule.EndTime)}`}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
            <hr></hr>
            <header>
              <h5 className="mt-5 mb-3 fw-bold text-center">Coach Reports</h5>
            </header>
            <section className="row m-0 p-0">
              <section className="col-lg-4 ps-0 text-center">
                <section className="d-flex flex-column gap-2">
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Total</h6>
                    <p className="m-0">{`${coaches.length} coach/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Fulltime</h6>
                    <p className="m-0">{`${countCoachTypes(
                      "Fulltime"
                    )} coach/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Parttime</h6>
                    <p className="m-0">{`${countCoachTypes(
                      "Parttime"
                    )} coach/s`}</p>
                  </section>
                </section>
              </section>
              <section
                className="col-lg-8 overflow-y-auto border rounded"
                style={{ height: "50vh" }}
              >
                <section className="row m-0 p-0 p-3 px-5 text-center">
                  <table
                    className="table table-hover"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-start">Coach</th>
                        <th>Type</th>
                        <th className="text-end">Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coaches &&
                        coaches.map((coach, coach_index) => (
                          <tr key={coach_index}>
                            <td className="text-start">{`${coach.LastName}, ${coach.FirstName}`}</td>
                            <td>{`${coach.CoachType}`}</td>
                            <td className="text-end">{`${getTotalCoachUnits(
                              coach.SCHLID
                            )} units`}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
            <hr></hr>
            <header>
              <h5 className="mt-5 mb-3 fw-bold text-center">Section Reports</h5>
            </header>
            <section className="row m-0 p-0">
              <section className="col-lg-4 ps-0 text-center">
                <section className="d-flex flex-column gap-2">
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Total</h6>
                    <p className="m-0">{`${getTotalPopulation()} student/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Senior High School</h6>
                    <p className="m-0">
                      {`${getTotalPerLevel("Senior High School")} student/s`}
                    </p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Tertiary</h6>
                    <p className="m-0">
                      {`${getTotalPerLevel("Tertiary")} student/s`}
                    </p>
                  </section>
                </section>
              </section>
              <section
                className="col-lg-8 overflow-y-auto border rounded"
                style={{ height: "50vh" }}
              >
                <section className="row m-0 p-0 p-3 px-5 text-center">
                  <table
                    className="table table-hover"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-start">Section</th>
                        <th>Population</th>
                        <th className="text-end">Classes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections &&
                        sections.map((section, section_index) => (
                          <tr key={section_index}>
                            <td className="text-start">{section.Section}</td>
                            <td>{`${section.Population} student/s`}</td>
                            <td className="text-end">{`${countSectionSchedule(
                              section.Section
                            )} class/s`}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
            <hr></hr>
            <header>
              <h5 className="mt-5 mb-3 fw-bold text-center">Room Reports</h5>
            </header>
            <section className="row m-0 p-0">
              <section className="col-lg-4 ps-0 text-center">
                <section className="d-flex flex-column gap-2">
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>Total</h6>
                    <p className="m-0">{`${rooms.length} student/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>{`Lecture`}</h6>
                    <p className="m-0">{`${countFacility(
                      "Lecture"
                    )} Lecture/s`}</p>
                  </section>
                  <section className="bg-white rounded shadow-sm p-3 d-flex justify-content-between">
                    <h6>{`Laboratory`}</h6>
                    <p className="m-0">{`${countFacility(
                      "Laboratory"
                    )} Laboratory/s`}</p>
                  </section>
                </section>
              </section>
              <section
                className="col-lg-8 overflow-y-auto border rounded"
                style={{ height: "50vh" }}
              >
                <section className="row m-0 p-0 p-3 px-5 text-center">
                  <table
                    className="table table-hover"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-start">Room</th>
                        <th>Capacity</th>
                        <th className="text-end">Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms &&
                        rooms.map((room, room_index) => (
                          <tr key={room_index}>
                            <td className="text-start">{room.Room}</td>
                            <td>{`${room.Capacity} seat/s`}</td>
                            <td className="text-end">{`${getRoomUnits(
                              room.Room
                            )}`}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
          </main>
        </main>
      </section>
    </main>
  );
}
