import React, { useEffect, useState } from "react";
import useDatabase from "../../hook/useDatabase";
import useTimeFormat from "../../hook/useTimeFormat";
import { ScheduleList } from "../../component/card/ScheduleList";
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
    room.map((item, i) => {
      rooms.push({
        Room: item.Room,
        Facility: item.Facility,
        Capacity: item.Capacity,
        Units: 0,
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
    var available_room = rooms;
    var assigned_coach = coaches;
    var out_schedule = [];
    var start_of_the_day = 480;

    //MAIN FUNCTION
    weekly.map((evnt, e) => {
      out_schedule.push({
        SCT: "All Sections",
        CRS: evnt.WeeklyEvent,
        CCH: "None",
        CPT: "Weekly Event",
        UNT: 1.5,
        SMS: "All Semesters",
        ROM: "Court",
        CCH_UNT: 0,
        HAS_LAB: false,
        IS_LAB: false,
      });
    });

    for (var i = 0; i < expected_class.length; i++) {
      // if (expected_class[i].Semester === target_semester) {
      if (!IS_LAB(expected_class[i].Component)) {
        out_schedule.push({
          SCT: expected_class[i].Section,
          CRS: expected_class[i].Course,
          CCH: ADD_COACH(expected_class[i].Course).LastName,
          CPT: expected_class[i].Component,
          UNT: expected_class[i].Units,
          SMS: expected_class[i].Semester,
          ROM: "None",
          DAY: "None",
          STR_TME: "None",
          END_TME: "None",
          CPC: "None",
          ROM_UNT: "None",
          PPL: expected_class[i].Population,
          CCH_UNT:
            ADD_COACH(expected_class[i].Course).Units + expected_class[i].Units,
          HAS_LAB: HAS_LAB(
            expected_class[i].Section,
            expected_class[i].Course,
            expected_class[i].Component
          ),
          IS_LAB: IS_LAB(expected_class[i].Component),
        });
        ADD_UNITS_TO_COACH(
          ADD_COACH(expected_class[i].Course).LastName,
          expected_class[i].Units
        );
        if (
          HAS_LAB(
            expected_class[i].Section,
            expected_class[i].Course,
            expected_class[i].Component
          )
        ) {
          for (var j = 0; j < expected_class.length; j++) {
            if (IS_LAB(expected_class[j].Component)) {
              if (expected_class[j].Section === expected_class[i].Section) {
                if (expected_class[j].Course === expected_class[i].Course) {
                  out_schedule.push({
                    SCT: expected_class[j].Section,
                    CRS: expected_class[j].Course,
                    CCH: ADD_COACH(expected_class[i].Course).LastName,
                    CPT: expected_class[j].Component,
                    UNT: expected_class[j].Units,
                    SMS: expected_class[j].Semester,
                    ROM: "None",
                    DAY: "None",
                    STR_TME: "None",
                    END_TME: "None",
                    CPC: "None",
                    ROM_UNT: "None",
                    PPL: expected_class[j].Population,
                    CCH_UNT:
                      ADD_COACH(expected_class[j].Course).Units +
                      expected_class[j].Units,
                    HAS_LAB: HAS_LAB(
                      expected_class[j].Section,
                      expected_class[j].Course,
                      expected_class[j].Component
                    ),
                    IS_LAB: IS_LAB(expected_class[j].Component),
                  });
                  ADD_UNITS_TO_COACH(
                    ADD_COACH(expected_class[i].Course).LastName,
                    expected_class[j].Units
                  );
                }
              }
            }
          }
        }
      }
      // }
    }

    //UTILITY FUNCTIONS
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

    return out_schedule;
  }

  // function x(section, day, units) {
  //   for (var k = 0; k < sched.length; k++) {
  //     if (
  //       section === sched[k].Section &&
  //       day === sched[k].Day &&
  //       units < sched[k].EndTime
  //     ) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // function getcoach() {
  //   for (var i = 0; i < coachtype.length; i++) {
  //     for (var j = 0; j < coaches.length; j++) {
  //       if (coachtype[i].CoachType === coaches[j].CoachType) {
  //         if (coaches[j].Units < 10) {
  //           return coaches[j].LastName;
  //         }
  //       }
  //     }
  //   }
  // }
  // function getcoachunits(selCoach) {
  //   for (var i = 0; i < coaches.length; i++) {
  //     if (coaches[i].LastName === selCoach) {
  //       return coaches[i].Units;
  //     }
  //   }
  // }

  // function test() {
  //   weekly.map((evnt, e) => {
  //     sched.push({
  //       Section: "ABC00" + e,
  //       Course: evnt.WeeklyEvent,
  //       Component: "Weekly Event",
  //       Room: "Court",
  //       Facility: evnt.WeeklyEvent,
  //       Units: 0,
  //       Day: evnt.Day,
  //       TimeStart: evnt.StartTime,
  //       EndTime: evnt.EndTime,
  //       Population: 0,
  //       Capacity: 0,
  //       AcademicYear: ay[0].ACY_Code,
  //       Curriculum: ay[0].CRR_Code,
  //     });
  //   });
  //   for (var i = 0; i < classes.length; i++) {
  //     for (var j = 0; j < rooms.length; j++) {
  //       if (
  //         classes[i].Component.includes(rooms[j].Facility) &&
  //         rooms[j].Units + classes[i].Units <= 13 &&
  //         classes[i].Population < rooms[j].Capacity &&
  //         x(classes[i].Section, rooms[j].Day, 480 + rooms[j].Units * 60) &&
  //         getcoachunits(getcoach()) < 10
  //       ) {
  //         sched.push({
  //           Section: classes[i].Section,
  //           Course: classes[i].CRS_Code,
  //           Component: classes[i].Component,
  //           Room: rooms[j].Room,
  //           Facility: rooms[j].Facility,
  //           Units: classes[i].Units,
  //           Day: rooms[j].Day,
  //           TimeStart: 480 + rooms[j].Units * 60,
  //           EndTime: 480 + (rooms[j].Units * 60 + classes[i].Units * 60),
  //           Population: classes[i].Population,
  //           Capacity: rooms[j].Capacity,
  //           AcademicYear: ay[0].ACY_Code,
  //           Curriculum: ay[0].CRR_Code,
  //           Coach: getcoach(),
  //         });
  //         rooms[j].Units += classes[i].Units;
  //         coaches.map((coach, i) =>
  //           coach.LastName === getcoach()
  //             ? console.log((coach.Units += classes[i].Units))
  //             : null
  //         );
  //         break;
  //       } else if (j === rooms.length - 1) {
  //         console.log(
  //           classes[i].Section +
  //             " " +
  //             classes[i].Course +
  //             " is not scheduled! No Rooms Available."
  //         );
  //       }
  //     }
  //   }
  // }

  return (
    <main>
      <h1>Schedules</h1>
      <section>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setSchedule(PROC_GEN_SCHED());
            console.log(PROC_GEN_SCHED());
          }}
        >
          Generate
        </button>
        <main className="p-3 border rounded m-2">
          {schedule.length > 0
            ? schedule.map((schedule, i) => (
                <main className="row p-2 my-2 m-0 border rounded text-center">
                  <section className="col p-0 m-0">{schedule.SCT}</section>
                  <section className="col p-0 m-0">
                    {schedule.CRS} ( {schedule.CPT} )
                  </section>
                  <section className="col p-0 m-0">
                    <span className="pe-2">( {schedule.CCH_UNT} )</span>
                    {schedule.CCH}
                  </section>
                  <section className="col p-0 m-0">
                    <span>( {schedule.ROM_UNT} )</span> {schedule.ROM}
                  </section>
                  <section className="col p-0 m-0">{schedule.DAY}</section>
                  <section className="col p-0 m-0">
                    {convertMinutes(schedule.STR_TME)}
                    {" - "}
                    {convertMinutes(schedule.END_TME)}
                  </section>
                  <section className="col p-0 m-0">
                    {schedule.PPL} / {schedule.CPC}
                  </section>
                  <section className="col p-0 m-0">{schedule.SMS}</section>
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
