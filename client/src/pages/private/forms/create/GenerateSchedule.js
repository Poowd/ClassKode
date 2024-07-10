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

export function GenerateSchedule() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  var classes = [];
  var rooms = [];
  var sched = [];
  const [expected, setExpected] = useState([]);
  const [room, setRoom] = useState([]);
  const [schedule, setSchedule] = useState([]);
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
    expected.map((item, i) => {
      classes.push({
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
  }, [expected, room]);

  function test() {
    for (var i = 0; i < classes.length; i++) {
      for (var j = 0; j < rooms.length; j++) {
        if (
          classes[i].Component.includes(rooms[j].Facility) &&
          rooms[j].Units + classes[i].Units <= 13 &&
          classes[i].Population < rooms[j].Capacity
        ) {
          sched.push({
            Section: classes[i].Section,
            Course: classes[i].Course,
            Component: classes[i].Component,
            Room: rooms[j].Room,
            Facility: rooms[j].Facility,
            Units: classes[i].Units,
            Day: rooms[j].Day,
            TimeStart: 480 + rooms[j].Units * 60,
            EndTime: 480 + (rooms[j].Units * 60 + classes[i].Units * 60),
            Population: classes[i].Population,
            Capacity: rooms[j].Capacity,
          });
          rooms[j].Units += classes[i].Units;
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

  function convertMinutes(min) {
    var Hour = Math.floor(min / 60); //convert minutes to hours
    const Minute = min / 60 - Hour; //convert minutes to hours minus the hour to get the remainder
    const Cycle = Hour >= 12 ? "PM" : "AM";
    Hour = Hour % 12 || 12;
    const tempMinute = Minute > 0 ? "30" : "00";
    const Format = Hour + ":" + tempMinute.toString() + " " + Cycle;
    return Format;
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
                <DefaultButton class="btn-primary px-2" icon={<FaRegSave />} />
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
              slot1={sc.Section + " ( " + sc.Population + " )"}
              slot2={sc.Course}
              slot3={
                sc.Day +
                " : " +
                convertMinutes(sc.TimeStart) +
                " - " +
                convertMinutes(sc.EndTime)
              }
              slot4={sc.Room + " ( " + sc.Capacity + " )"}
              slot5={"Coach"}
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
