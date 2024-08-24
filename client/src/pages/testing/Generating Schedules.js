import React, { useEffect, useState } from "react";
import useDatabase from "../../hook/useDatabase";
import useTimeFormat from "../../hook/useTimeFormat";
import { Link } from "react-router-dom";

export function GeneratingSchedules() {
  const [get, post] = useDatabase();
  const [convertMinutes] = useTimeFormat();

  var classes = [];
  var rooms = [];
  var coaches = [];
  var sched = [];

  const [expected, setExpected] = useState([]);
  const [room, setRoom] = useState([]);
  const [coach, setCoach] = useState([]);

  const [weekly, setWeekly] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [specialize, setSpecialize] = useState([]);
  const [ay, setAY] = useState([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  useEffect(() => {
    post("expected-classes", expected, setExpected);
    post("room", room, setRoom);
    post("assignment", coach, setCoach);
    post("coachtype", coachtype, setCoachType);
    post("weekly-event", weekly, setWeekly);
    post("academicyear-current", ay, setAY);
    // console.log(classes);
    // console.log(room);
    // console.log(coaches);
  }, []);

  function MGRT_DATA() {
    expected.map((item, i) => {
      classes.push({
        CRS_Code: item.CRS_Code,
        Course: item.Course,
        Component: item.Component,
        Section: item.Section,
        Population: item.Population,
        Semester: item.Semester,
        Units: item.MaxUnits,
      });
    });
    days.map((day, o) => {
      room.map((item, i) => {
        rooms.push({
          Room: item.Room,
          Day: day,
          Facility: item.Facility,
          Capacity: item.Capacity,
          Units: 0,
          Classes: [],
        });
      });
    });
    coach.map((item, i) => {
      coaches.push({
        SCHLID: item.SCHLID,
        LastName: item.LastName,
        Department: item.DPT_Code,
        CoachType: item.CoachType,
        MaxUnits: item.MaxUnits,
        Units: 0,
      });
    });
  }

  useEffect(() => {
    post("SPCL_CRS", specialize, setSpecialize);
  }, []);

  MGRT_DATA();

  function PROC_GEN_SCHED(target_semester) {
    var expected_class = classes;
    var lecture_classes = [];
    var lab_classes = [];
    var available_room = rooms;
    var assigned_coach = coaches;
    var out_schedule = [];
    var rooms_with_schedules = [];
    var start_of_the_day = 480;
    var schedules = [];

    for (var i = 0; i < expected_class.length; i++) {
      if (!IS_LAB(expected_class[i].Component)) {
        lecture_classes.push(expected_class[i]);
      } else {
        lab_classes.push(expected_class[i]);
      }
    }

    // RUN FUNCTIONS
    PHS_1(); // Phase 1: Add the weekly events that occurs on both semester
    PHS_2(); // Phase 2: Add assign coaches to each of the classes
    PHS_3(); // Phase 3: Assign each classes unto a room
    PHS_3_1();
    PHS_4(); // Phase 4: Add the room, day, time based from room slot
    return schedules;

    // MAIN FUNCTION
    function PHS_1() {
      // Step 1: Set the events fill up any missing information
      weekly.map((evnt, e) => {
        schedules.push({
          SCT: "All Sections",
          CRS: evnt.WeeklyEvent,
          CCH: "None",
          CPT: "Weekly Event",
          UNT: 1.5,
          SMS: "All Semesters",
          ROM: "Court",
          DAY: "None",
          STR_TME: evnt.StartTime,
          END_TME: evnt.EndTime,
          CCH_UNT: 0,
          HAS_LAB: false,
          IS_LAB: false,
        });
      });
    }

    function PHS_2() {
      for (var i = 0; i < lecture_classes.length; i++) {
        // if (lecture_classes[i].Semester === target_semester) {
        //Step 1: Check if the class is a laboratory or lecture type
        out_schedule.push({
          SCT: lecture_classes[i].Section,
          CRS: lecture_classes[i].Course,
          CCH: ADD_COACH(lecture_classes[i].Course).LastName,
          CPT: lecture_classes[i].Component,
          UNT: lecture_classes[i].Units,
          SMS: lecture_classes[i].Semester,
          ROM: "None",
          DAY: "None",
          STR_TME: "None",
          END_TME: "None",
          CPC: "None",
          ROM_UNT: "None",
          PPL: lecture_classes[i].Population,
          CCH_UNT:
            ADD_COACH(lecture_classes[i].Course).Units +
            lecture_classes[i].Units,
          HAS_LAB: HAS_LAB(
            lecture_classes[i].Section,
            lecture_classes[i].Course,
            lecture_classes[i].Component
          ),
          IS_LAB: IS_LAB(lecture_classes[i].Component),
        });
        ADD_UNITS_TO_COACH(
          ADD_COACH(lecture_classes[i].Course).LastName,
          lecture_classes[i].Units
        );
        // Step 2: Check whether the class has a laboratory
        if (
          HAS_LAB(
            lecture_classes[i].Section,
            lecture_classes[i].Course,
            lecture_classes[i].Component
          )
        ) {
          // Step 3: Find the laboratory of the current class
          for (var j = 0; j < lab_classes.length; j++) {
            if (IS_LAB(lab_classes[j].Component)) {
              if (lab_classes[j].Section === lab_classes[i].Section) {
                if (lab_classes[j].Course === lab_classes[i].Course) {
                  out_schedule.push({
                    SCT: lab_classes[j].Section,
                    CRS: lab_classes[j].Course,
                    CCH: ADD_COACH(lab_classes[i].Course).LastName,
                    CPT: lab_classes[j].Component,
                    UNT: lab_classes[j].Units,
                    SMS: lab_classes[j].Semester,
                    ROM: "None",
                    DAY: "None",
                    STR_TME: "None",
                    END_TME: "None",
                    CPC: "None",
                    ROM_UNT: "None",
                    PPL: lab_classes[j].Population,
                    CCH_UNT:
                      ADD_COACH(lab_classes[j].Course).Units +
                      lab_classes[j].Units,
                    HAS_LAB: HAS_LAB(
                      lab_classes[j].Section,
                      lab_classes[j].Course,
                      lab_classes[j].Component
                    ),
                    IS_LAB: IS_LAB(lab_classes[j].Component),
                  });
                  ADD_UNITS_TO_COACH(
                    ADD_COACH(lab_classes[i].Course).LastName,
                    lab_classes[j].Units
                  );
                }
              }
            }
          }
        }
        // }
      }
    }

    function PHS_3() {
      // Step 1: Assign each class unto a room
      for (var i = 0; i < out_schedule.length; i++) {
        for (var j = 0; j < available_room.length; j++) {
          if (out_schedule[i].CPT.includes(available_room[j].Facility)) {
            if (available_room[j].Units + out_schedule[i].UNT <= 13) {
              if (out_schedule[i].PPL < available_room[j].Capacity) {
                available_room[j].Classes.push(out_schedule[i]);
                available_room[j].Units += out_schedule[i].UNT;
                break;
              }
            }
          }
        }
      }
      // Step 2: Migrate rooms that has classes
      for (var i = 0; i < available_room.length; i++) {
        if (available_room[i].Classes.length > 0) {
          rooms_with_schedules.push(available_room[i]);
        }
      }
    }

    function PHS_3_1() {
      rooms_with_schedules.map((m1, a) => {
        RE_ARNG_ARR(m1.Classes);
      });
    }

    function PHS_4() {
      var counter = 0;
      // Step 1: Retrieve all rooms that have classes
      for (var i = 0; i < rooms_with_schedules.length; i++) {
        // Step 2: Reset units to 0 to remove previous checking
        rooms_with_schedules[i].Units = 0;
        // Step 3: Pull out the data per class and use the parent to get room, day, and time
        for (var j = 0; j < rooms_with_schedules[i].Classes.length; j++) {
          schedules.push({
            NUM: counter,
            SCT: rooms_with_schedules[i].Classes[j].SCT,
            CRS: rooms_with_schedules[i].Classes[j].CRS,
            CCH: rooms_with_schedules[i].Classes[j].CCH,
            CPT: rooms_with_schedules[i].Classes[j].CPT,
            UNT: rooms_with_schedules[i].Classes[j].UNT,
            SMS: rooms_with_schedules[i].Classes[j].SMS,
            ROM: rooms_with_schedules[i].Room,
            DAY: rooms_with_schedules[i].Day,
            STR_TME:
              start_of_the_day +
              CNVRT_UNITS_TO_MNTS(rooms_with_schedules[i].Units),
            END_TME:
              start_of_the_day +
              CNVRT_UNITS_TO_MNTS(rooms_with_schedules[i].Units) +
              CNVRT_UNITS_TO_MNTS(rooms_with_schedules[i].Classes[j].UNT),
            CPC: rooms_with_schedules[i].Capacity,
            ROM_UNT:
              rooms_with_schedules[i].Units +
              rooms_with_schedules[i].Classes[j].UNT,
            PPL: rooms_with_schedules[i].Classes[j].PPL,
            CCH_UNT: rooms_with_schedules[i].Classes[j].CCH_UNT,
            HAS_LAB: rooms_with_schedules[i].Classes[j].HAS_LAB,
            IS_LAB: rooms_with_schedules[i].Classes[j].IS_LAB,
          });
          counter++;
          // Update room units and capacity
          ADD_UNITS_TO_ROOM(
            rooms_with_schedules[i].Room,
            rooms_with_schedules[i].Classes[j].UNT
          );
        }
      }
    }

    //UTILITY FUNCTIONS
    function doTimeIntervalsOverlap(start1, end1, start2, end2) {
      return !(end1 <= start2 || start1 >= end2);
    }

    function RE_ARNG_ARR(target_array) {
      for (let i = target_array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [target_array[i], target_array[j]] = [target_array[j], target_array[i]];
      }
      return target_array;
    }

    function ADD_UNITS_TO_ROOM(target_room, target_units) {
      for (var i = 0; i < rooms_with_schedules.length; i++) {
        if (rooms_with_schedules[i].Room === target_room) {
          rooms_with_schedules[i].Units += target_units;
        }
      }
    }

    function CNVRT_MNTS_TO_UNITS(target_minutes) {
      return target_minutes / 60;
    }

    function CNVRT_UNITS_TO_MNTS(target_units) {
      return target_units * 60;
    }

    function ADD_UNITS_TO_COACH(target_coach, course_units) {
      for (var i = 0; i < assigned_coach.length; i++) {
        if (assigned_coach[i].LastName === target_coach) {
          assigned_coach[i].Units += course_units;
        }
      }
    }

    function ADD_COACH(target_course) {
      for (var i = 0; i < coachtype.length; i++) {
        for (var j = 0; j < coaches.length; j++) {
          if (IS_SPECIALIZED(coaches[j].LastName, target_course)) {
            if (coachtype[i].CoachType === coaches[j].CoachType) {
              if (coaches[j].Units < coachtype[i].MaxUnits - 3) {
                return coaches[j];
              }
            }
          }
        }
      }
    }

    function IS_SPECIALIZED(target_coach, target_course) {
      for (var i = 0; i < specialize.length; i++) {
        if (specialize[i].LastName === target_coach) {
          if (specialize[i].Course === target_course) {
            return true;
          }
        }
      }
      return false;
    }

    function HAS_LAB(target_section, target_course, target_component) {
      if (!target_component.includes("Laboratory")) {
        for (var i = 0; i < expected_class.length; i++) {
          if (expected_class[i].Section === target_section) {
            if (expected_class[i].Course === target_course) {
              if (expected_class[i].Component.includes("Laboratory")) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    function IS_LAB(target_component) {
      if (target_component.includes("Laboratory")) {
        return true;
      }
      return false;
    }
  }

  function generateclasses() {
    var schedule = PROC_GEN_SCHED();

    return schedule;

    function CHK_CNFLT(classes) {
      for (var i = 0; i < classes.length; i++) {
        for (var j = 0; j < classes.length; j++) {
          if (i > 1 && j > 1) {
            if (classes[i].DAY === classes[j].DAY) {
              if (classes[i].SCT === classes[j].SCT) {
                if (
                  classes[i].END_TME >= classes[j].STR_TME ||
                  classes[i].STR_TME <= classes[j].END_TME
                ) {
                  return false;
                }
              }
            }
          }
        }
      }
      return true;
    }
  }

  function checkForConflicts(ST1, ET1, ST2, ET2) {
    // Convert start and end times to minutes past midnight
    const convertToMinutes = (time) => {
      return time * 60;
    };

    // Extract start and end times for comparison
    const startTimeA = convertToMinutes(ST1);
    const endTimeA = convertToMinutes(ET1);
    const startTimeB = convertToMinutes(ST2);
    const endTimeB = convertToMinutes(ET2);

    // Check for conflicts
    if (
      (startTimeA < endTimeB && startTimeB < endTimeA) ||
      (startTimeA > endTimeB && startTimeB > endTimeA) ||
      (startTimeA === startTimeB && endTimeA === endTimeB)
    ) {
      return console.log("conflict"); // Overlap exists
    }

    return console.log("no conflict"); // No overlap
  }

  var conflict = [];

  function temporary(skid) {
    skid.map((sc, i) =>
      skid.map((cp, p) =>
        sc.DAY === cp.DAY
          ? sc.SCT === cp.SCT
            ? checkForConflicts(sc.STR_TME, sc.END_TME, cp.STR_TME, cp.END_TME)
              ? sc.CRS === cp.CRS && sc.CPT === cp.CPT
                ? null
                : conflict.push(sc.NUM) /*console.log(
                  `${i} - ${sc.SCT} is conflicted with ${cp.SCT} with time ${sc.STR_TME}:${sc.END_TME} - ${cp.STR_TME}:${cp.END_TME}`
                )*/
              : null /*console.log(
                `${i} - ${sc.SCT} is not conflicted with ${cp.SCT} with time ${sc.STR_TME}:${sc.END_TME} - ${cp.STR_TME}:${cp.END_TME}`
              )*/
            : null
          : null
      )
    );
  }

  return (
    <main>
      <h1>Schedules</h1>
      <section>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            temporary();
          }}
        >
          Generate
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setSchedule(generateclasses());
            temporary(generateclasses());
            console.log(conflict);
            console.log(schedule);
          }}
        >
          Generate
        </button>
        <main className="w-100 p-3">
          <section>
            Schedule Length <span>{schedule.length}</span>
          </section>
        </main>
        <main className="p-3 border rounded m-2">
          {schedule.length > 0
            ? schedule.map((sc, i) => (
                <main
                  className={
                    conflict.includes(sc.NUM)
                      ? "row p-2 my-2 m-0 border rounded text-center text-danger"
                      : "row p-2 my-2 m-0 border rounded text-center"
                  }

                  //   schedule.map((cp, p) =>
                  //   sc.DAY === cp.DAY
                  //     ? sc.SCT === cp.SCT
                  //       ? checkForConflicts(
                  //           sc.STR_TME,
                  //           sc.END_TME,
                  //           cp.STR_TME,
                  //           cp.END_TME
                  //         )
                  //         ? sc.CRS === cp.CRS && sc.CPT === cp.CPT
                  //           ? "row p-2 my-2 m-0 border rounded text-center"
                  //           : "row p-2 my-2 m-0 border rounded text-center text-danger"
                  //         : "row p-2 my-2 m-0 border rounded text-center"
                  //       : "row p-2 my-2 m-0 border rounded text-center"
                  //     : "row p-2 my-2 m-0 border rounded text-center"
                  // )}
                >
                  <section className="col p-0 m-0">{sc.SCT}</section>
                  <section className="col p-0 m-0">
                    {sc.CRS} ( {sc.CPT} )
                  </section>
                  <section className="col p-0 m-0">
                    <span className="pe-2">( {sc.CCH_UNT} )</span>
                    {sc.CCH}
                  </section>
                  <section className="col p-0 m-0">
                    <span>( {sc.ROM_UNT} )</span> {sc.ROM}
                  </section>
                  <section className="col p-0 m-0">{sc.DAY}</section>
                  <section className="col p-0 m-0">
                    {sc.STR_TME}
                    {" - "}
                    {sc.END_TME}
                  </section>
                  <section className="col p-0 m-0">
                    {sc.PPL} / {sc.CPC}
                  </section>
                  <section className="col p-0 m-0">{sc.SMS}</section>
                </main>
              ))
            : null}
        </main>
        <main>
          <ul>
            <li>
              <Link to="http://localhost:3000/testing/gensched">
                http://localhost:3000/testing/gensched
              </Link>
            </li>
            <li>I can now generate a schedule ( course, section, coach )</li>
            <li>I still need some checking for coach schedules</li>
            <li>Need to determine wether the class is for 1st sem / 2nd sem</li>
            <li>No Day, Time, and Room</li>
            <li>Not added Academic Year and Curriculum to the output yet</li>
          </ul>
        </main>
      </section>
    </main>
  );
}
