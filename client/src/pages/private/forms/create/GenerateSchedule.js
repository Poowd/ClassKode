import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PiGearSixFill } from "react-icons/pi";
import { MdArrowBackIosNew } from "react-icons/md";
import { ScheduleList } from "../../../../component/card/ScheduleList";
import { TbListDetails } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";

export function GenerateSchedule() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [convertMinutes] = useTimeFormat();

  var classes = [];
  var rooms = [];
  var coaches = [];
  var sched = [];

  const [expected, setExpected] = useState([]);
  const [ay, setAY] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [room, setRoom] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [coach, setCoach] = useState([]);
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
    expected.map((item, i) => {
      classes.push({
        CRS_Code: item.CRS_Code,
        Course: item.Course,
        Component: item.Component,
        Section: item.Section,
        Population: item.Population,
        Units: item.MaxUnits,
      });
    });
    days.map((day, d) => {
      room.map((item, i) => {
        rooms.push({
          Room: item.Room,
          Facility: item.Facility,
          Capacity: item.Capacity,
          Units: 0,
          Day: day,
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
    // console.log(classes);
    // console.log(room);
    // console.log(coaches);
  }, [expected, room, coaches]);

  function x(section, day, units) {
    for (var k = 0; k < sched.length; k++) {
      if (
        section === sched[k].Section &&
        day === sched[k].Day &&
        units < sched[k].EndTime
      ) {
        return false;
      }
    }
    return true;
  }

  function getcoach() {
    for (var i = 0; i < coachtype.length; i++) {
      for (var j = 0; j < coaches.length; j++) {
        if (coachtype[i].CoachType === coaches[j].CoachType) {
          if (coaches[j].Units < 10) {
            return coaches[j].LastName;
          }
        }
      }
    }
  }
  function getcoachunits(selCoach) {
    for (var i = 0; i < coaches.length; i++) {
      if (coaches[i].LastName === selCoach) {
        return coaches[i].Units;
      }
    }
  }

  function test() {
    weekly.map((evnt, e) => {
      sched.push({
        Section: "ABC00" + e,
        Course: evnt.WeeklyEvent,
        Component: "Weekly Event",
        Room: "Court",
        Facility: evnt.WeeklyEvent,
        Units: 0,
        Day: evnt.Day,
        TimeStart: evnt.StartTime,
        EndTime: evnt.EndTime,
        Population: 0,
        Capacity: 0,
        AcademicYear: ay[0].ACY_Code,
        Curriculum: ay[0].CRR_Code,
      });
    });
    for (var i = 0; i < classes.length; i++) {
      for (var j = 0; j < rooms.length; j++) {
        if (
          classes[i].Component.includes(rooms[j].Facility) &&
          rooms[j].Units + classes[i].Units <= 13 &&
          classes[i].Population < rooms[j].Capacity &&
          x(classes[i].Section, rooms[j].Day, 480 + rooms[j].Units * 60) &&
          getcoachunits(getcoach()) < 10
        ) {
          sched.push({
            Section: classes[i].Section,
            Course: classes[i].CRS_Code,
            Component: classes[i].Component,
            Room: rooms[j].Room,
            Facility: rooms[j].Facility,
            Units: classes[i].Units,
            Day: rooms[j].Day,
            TimeStart: 480 + rooms[j].Units * 60,
            EndTime: 480 + (rooms[j].Units * 60 + classes[i].Units * 60),
            Population: classes[i].Population,
            Capacity: rooms[j].Capacity,
            AcademicYear: ay[0].ACY_Code,
            Curriculum: ay[0].CRR_Code,
            Coach: getcoach(),
          });
          rooms[j].Units += classes[i].Units;
          coaches.map((coach, i) =>
            coach.LastName === getcoach()
              ? console.log((coach.Units += classes[i].Units))
              : null
          );
          break;
        } else if (j === rooms.length - 1) {
          console.log(
            classes[i].Section +
              " " +
              classes[i].Course +
              " is not scheduled! No Rooms Available."
          );
        }
      }
    }
  }
  return (
    <main>
      <main className="h-100 position-relative overflow-y-auto px-1">
        <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
          <div className="d-flex justify-content-end gap-2">
            <div className="w-100 d-flex justify-content-between">
              <div className="d-flex gap-2 ">
                <DefaultButton
                  class=""
                  icon={<MdArrowBackIosNew />}
                  function={() => navigate(-1)}
                />
              </div>
              <div className="d-flex gap-2 ">
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<TbListDetails />}
                />

                <DefaultButton class="btn-primary px-2" icon={<FaFilter />} />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<FaRegSave />}
                  function={() => {
                    for (var i in schedule) {
                      console.log(classes);
                      post("save-presched", schedule[i], setSchedule);
                    }

                    navigate(-1);
                  }}
                />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Generate"
                  function={() => {
                    test();
                    setSchedule(sched);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          {schedule.map((sc, i) => (
            <ScheduleList
              key={i}
              slot1={sc.Section}
              slot2={sc.Course}
              slot3={
                sc.Day +
                " : " +
                convertMinutes(sc.TimeStart) +
                " - " +
                convertMinutes(sc.EndTime)
              }
              slot4={sc.Room + " " + sc.Population + "/" + sc.Capacity}
              slot5={sc.Coach}
              slot6={sc.Component + " ( " + sc.Units + " )"}
              link={null}
              state={null}
              custom={null}
            />
          ))}
        </section>
      </main>
    </main>
  );
}
